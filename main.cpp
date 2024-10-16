#include <SDL.h>
#include <SDL_image.h>
#include <SDL_ttf.h>  
#include <SDL_mixer.h>
#include <emscripten/emscripten.h>
#include <iostream>
#include "square.h"  
#include <emscripten/bind.h>
#include "projectile.h"
#include <vector> 
#include "enemy.h"  
#include "logging.h"

const int WINDOW_WIDTH = 1280;
const int WINDOW_HEIGHT = 720;


enum GameState {
    MENU,    
    PLAYING,   
    GAME_OVER,
    GAME_VICTORY,
    GAME_WIN
};

SDL_Window* window = nullptr;
SDL_Renderer* renderer = nullptr;
SDL_Texture* backgroundTexture = nullptr;       
SDL_Texture* galaxyTexture = nullptr;           
SDL_Texture* textTexture = nullptr;  
SDL_Texture* moreTexture = nullptr;              
SDL_Texture* playerTexture = nullptr;
SDL_Texture* bulletTexture = nullptr;
SDL_Texture* bulletTexture2 = nullptr;
SDL_Texture* enemyTexture = nullptr;  
SDL_Texture* bossTexture = nullptr;
Mix_Music* music = nullptr;
Mix_Music* techMusic = nullptr;
int phase = 1;
Mix_Chunk* enemyHitMusic = nullptr;
Mix_Chunk* playerHitMusic = nullptr;
Mix_Chunk* firingBulletMusic = nullptr;
SDL_Texture* heartTexture = nullptr;
SDL_Rect heart;          // Position and size of the heart
bool heartVisible = false; // Whether the heart is visible
int heartDuration = 10000; // Duration in milliseconds (10 seconds)
Uint32 heartSpawnTime = 0; // When the heart was spawned
bool heartCollected = false; // To track if the heart is collected
int playerHealth = 100; 
const int maxHealth = 100; // Maximum health for the player
Square square(100, 100, 75, 0, 0, 100);  // Initial square position and velocity
GameState currentState = MENU;  // The initial state of the game is MENU
TTF_Font* subfont = nullptr;  
TTF_Font* font = nullptr;    
TTF_Font* bigfont = nullptr;       // Font for rendering text
std::vector<Projectile> projectiles; // Vector to hold projectiles
std::vector<Enemy> enemies;  // Vector to store multiple enemies
std::vector<Projectile> enemyProjectiles;
std::vector<Projectile> bossProjectiles;
int score = 0;  // Variable to keep track of the score
int currentWave = 0;
float titleY = 0;           // Y position offset for the title
float titleSpeed = 0.02f;  // Speed of oscillation
float titleAmplitude = 20;  // Amplitude (how high and low it goes)
float titleTime = 0;    


bool isMusicMuted = false;  // Global flag to keep track of music state (on/off)

struct Boss {
    SDL_Rect rect;
    int health;
    int speedY;
    int speedX;
    int shootingCooldown;
    bool alive;

    Boss() {
        rect = {1500, 100, 120, 120}; 
        health = 25;  
        speedY = 5;  
        speedX = 5;
        shootingCooldown = 0;
        alive = false;  
    }

    void move() {
        rect.y += speedY;
        rect.x -= speedX;
        if (rect.x <= 900){
            speedX = 0;
        }
        if (rect.y <= 0 || rect.y >= WINDOW_HEIGHT - rect.h) {
            speedY = -speedY;  // Reverse direction when hitting top or bottom
        }
    }

    void shoot(std::vector<Projectile>& projectiles) {
    if (shootingCooldown <= 0) {
        // Shoot projectiles in multiple directions
        projectiles.push_back(Projectile(rect.x + rect.w / 2, rect.y + rect.h / 2, 37, 27, -5, 0));   // Left
        projectiles.push_back(Projectile(rect.x + rect.w / 2, rect.y + rect.h / 2, 37, 27, -4, -4));  // Diagonal up-left
        projectiles.push_back(Projectile(rect.x + rect.w / 2, rect.y + rect.h / 2, 37, 27, -4, 4));
        projectiles.push_back(Projectile(rect.x + rect.w / 2, rect.y + rect.h / 2, 37, 27, -5, -2));  
        projectiles.push_back(Projectile(rect.x + rect.w / 2, rect.y + rect.h / 2, 37, 27, -5, 2));   // Diagonal down-left

        shootingCooldown = 50;  // Set a cooldown to prevent continuous shooting
    } else {
        shootingCooldown--;
    }
}

    void displayHealth(SDL_Renderer* renderer) {
        // Display a health bar above the boss

        SDL_Rect healthBarMax = { rect.x, rect.y - 10, rect.w , 5 }; // Position it above the enemy
        SDL_SetRenderDrawColor(renderer, 255, 0, 0, 255); // Red color for the health bar background
        SDL_RenderFillRect(renderer, &healthBarMax);

        SDL_Rect healthBar = {rect.x, rect.y - 10, rect.w * health / 25, 5};
        SDL_SetRenderDrawColor(renderer, 0, 255, 0, 255);  // Green health bar
        SDL_RenderFillRect(renderer, &healthBar);
    }
};

Boss boss;

extern "C" {
    void pauseMusic() {
        logToBrowser("pauseMusic function reached.");
        Mix_PauseMusic();
    }

    void playMusic() {
        if (Mix_PlayMusic(music, -1) == -1) {
            logToBrowser("Failed to play music: " + std::string(Mix_GetError()));
        }
    }

    void stopMusic() {
        Mix_HaltMusic();
    }

    void toggleMusicVolume() {
    if (isMusicMuted) {
        Mix_VolumeMusic(MIX_MAX_VOLUME);
        Mix_Volume(-1,128);  // Set volume to max
        logToBrowser("Music ON (Volume set to max)");
    } else {
        Mix_VolumeMusic(0);
        Mix_Volume(-1,0);
          // Mute the music
        logToBrowser("Music OFF (Muted)");
    }
    isMusicMuted = !isMusicMuted;  // Toggle the state
}
}

// Function to load textures
SDL_Texture* loadTexture(const std::string& path, SDL_Renderer* renderer) {
    SDL_Surface* tempSurface = IMG_Load(path.c_str()); 
    if (!tempSurface) {
        logToBrowser("Failed to load surface: " + std::string(IMG_GetError()));
        return nullptr;
    }
    SDL_Texture* texture = SDL_CreateTextureFromSurface(renderer, tempSurface);
    SDL_FreeSurface(tempSurface);  // Free the surface after creating the texture

    if (!texture) {
        logToBrowser("Failed to create texture: " + std::string(SDL_GetError()));
    }

    return texture;
}

SDL_Texture* renderText(const std::string& message, SDL_Color color, SDL_Renderer* renderer, TTF_Font* font) {
    SDL_Surface* surface = TTF_RenderText_Blended(font, message.c_str(), color);
    if (!surface) {
        logToBrowser("Failed to create text surface: " + std::string(TTF_GetError()));
        return nullptr;
    }

    SDL_Texture* texture = SDL_CreateTextureFromSurface(renderer, surface);
    SDL_FreeSurface(surface);

    if (!texture) {
        logToBrowser("Failed to create text texture: " + std::string(SDL_GetError()));
    }

    return texture;
}

bool checkCollision(const SDL_Rect& rect1, const SDL_Rect& rect2) {
    return (rect1.x < rect2.x + rect2.w &&
            rect1.x + rect1.w > rect2.x &&
            rect1.y < rect2.y + rect2.h &&
            rect1.y + rect1.h > rect2.y);
}

void handleCollisions(Square& player, std::vector<Projectile>& enemyProjectiles) {
    SDL_Rect playerRect = { player.getX(), player.getY(), player.getSize(), player.getSize() }; // Adjusted for Player's actual position and size

    for (auto it = enemyProjectiles.begin(); it != enemyProjectiles.end();) {
        SDL_Rect bulletRect = { it->getX(), it->getY(), it->getWidth(), it->getHeight() };

        if (checkCollision(playerRect, bulletRect)) {
            Mix_PlayChannel(-1, playerHitMusic, 0); // Play music in loop
            player.decreaseHealth(10);  // Decrease player's health when hit
            it = enemyProjectiles.erase(it); // Remove the bullet after collision
        } else {
            ++it;
        }
    }
}

void renderCenter(float p_x, float p_y, const char* p_text, TTF_Font* font, SDL_Color textColor)
{
		SDL_Surface* surfaceMessage = TTF_RenderText_Blended( font, p_text, textColor);
		SDL_Texture* message = SDL_CreateTextureFromSurface(renderer, surfaceMessage);

		SDL_Rect src;
		src.x = 0;
		src.y = 0;
		src.w = surfaceMessage->w;
		src.h = surfaceMessage->h; 

		SDL_Rect dst;
		dst.x = 1280/2 - src.w/2 + p_x;
		dst.y = 180/2 - src.h/2 + p_y;
		dst.w = src.w;
		dst.h = src.h;

		SDL_RenderCopy(renderer, message, &src, &dst);
		SDL_FreeSurface(surfaceMessage);
		SDL_DestroyTexture(message);
}

void renderScore(SDL_Renderer* renderer, int score) {
    SDL_Color white = { 255, 255, 255, 255 }; // Color for the score text
    std::string scoreText = "Score: " + std::to_string(score);
    SDL_Texture* scoreTexture = renderText(scoreText, white, renderer, subfont);

    if (scoreTexture) {
        int textWidth, textHeight;
        SDL_QueryTexture(scoreTexture, NULL, NULL, &textWidth, &textHeight);
        SDL_Rect textRect = { (WINDOW_WIDTH - textWidth) / 2, 10, textWidth, textHeight }; // Centered at the top
        SDL_RenderCopy(renderer, scoreTexture, NULL, &textRect);
        SDL_DestroyTexture(scoreTexture); // Free the texture after rendering
    }
}

void renderHealthBar(SDL_Renderer* renderer, int currentHealth, int maxHealth) {
    int barWidth = 200; // Max width of the health bar
    int barHeight = 20; // Height of the health bar
    int healthBarWidth = (currentHealth * barWidth) / maxHealth; // Current width based on health

    // Draw the background of the health bar (gray)
    SDL_Rect healthBarBg = { 10, 10, barWidth, barHeight };
    SDL_SetRenderDrawColor(renderer, 128, 128, 128, 255); // Gray color
    SDL_RenderFillRect(renderer, &healthBarBg);

    // Draw the health portion (green)
    SDL_Rect healthBar = { 10, 10, healthBarWidth, barHeight };
    SDL_SetRenderDrawColor(renderer, 0, 255, 0, 255); // Green color
    SDL_RenderFillRect(renderer, &healthBar);
}

void renderGameOver(std::string text) {
    SDL_Color white = { 255, 255, 255, 255 };
    std::string gameOverText  = text;
    SDL_Texture* gameOverTexture = renderText(gameOverText, white, renderer, font);
    
    // Get the dimensions of the text
    int textWidth, textHeight;
    SDL_QueryTexture(gameOverTexture, NULL, NULL, &textWidth, &textHeight);
    SDL_Rect textRect = { (WINDOW_WIDTH - textWidth) / 2, (WINDOW_HEIGHT - textHeight) / 2, textWidth, textHeight };
    
    // Render the text
    SDL_RenderCopy(renderer, gameOverTexture, NULL, &textRect);
    
    // Clean up
    SDL_DestroyTexture(gameOverTexture);
}

// Function to initialize enemies
void initializeEnemies(Enemy::MovementPattern pattern,int health, int mode) {
    enemies.push_back(Enemy(1280, 30, 50, -5, 2 , health, pattern, 0));  
    enemies.push_back(Enemy(1280, 130, 50, -5, 2 , health, pattern, 0));
    enemies.push_back(Enemy(1280, 230, 50, -4, 2 , health, pattern, 0)); 
    enemies.push_back(Enemy(1280, 380, 50, -4, 2 , health, pattern, 0));  
    enemies.push_back(Enemy(1280, 480, 50, -5, 2 , health, pattern, 0));
    enemies.push_back(Enemy(1280, 580, 50, -5, 2 , health, pattern, 0));  
    enemies.push_back(Enemy(1280, 80, 50, -5, 2 , health, pattern, 50));  
    enemies.push_back(Enemy(1280, 180, 50, -5, 2 , health, pattern, 50));
    enemies.push_back(Enemy(1280, 280, 50, -4, 2 , health, pattern, 50)); 
    enemies.push_back(Enemy(1280, 430, 50, -4, 2 , health, pattern, 50));  
    enemies.push_back(Enemy(1280, 530, 50, -5, 2 , health, pattern, 50));
    enemies.push_back(Enemy(1280, 630, 50, -5, 2 , health, pattern, 50)); 
    if (phase == 2){
        enemies.push_back(Enemy(1280, 30, 50, -5, 2 , health, pattern, 100));  
        enemies.push_back(Enemy(1280, 130, 50, -5, 2 , health, pattern, 100));
        enemies.push_back(Enemy(1280, 230, 50, -4, 2 , health, pattern, 100)); 
        enemies.push_back(Enemy(1280, 380, 50, -4, 2 , health, pattern, 100));  
        enemies.push_back(Enemy(1280, 480, 50, -5, 2 , health, pattern, 100));
        enemies.push_back(Enemy(1280, 580, 50, -5, 2 , health, pattern, 100));  
        enemies.push_back(Enemy(1280, 80, 50, -5, 2 , health, pattern, 150));  
        enemies.push_back(Enemy(1280, 180, 50, -5, 2 , health, pattern, 150));
        enemies.push_back(Enemy(1280, 280, 50, -4, 2 , health, pattern, 150)); 
        enemies.push_back(Enemy(1280, 430, 50, -4, 2 , health, pattern, 150));  
        enemies.push_back(Enemy(1280, 530, 50, -5, 2 , health, pattern, 150));
        enemies.push_back(Enemy(1280, 630, 50, -5, 2 , health, pattern, 150)); 
    }
}

// Variables for scrolling background
float scrollSpeed = 1.0f;      // Speed of scrolling
float scrollPosition1 = 0.0f;   // Current scroll position for the first background
float scrollPosition2 = 1280.0f; // Current scroll position for the second background (starts offscreen)

// The main loop function called by Emscripten
void main_loop() {
    static SDL_Event event;

    // Handle events (e.g., window close or user input)
    while (SDL_PollEvent(&event)) {
        if (event.type == SDL_QUIT) {
            emscripten_cancel_main_loop();  // Stop the loop if the user quits
        } else if (currentState == MENU && event.type == SDL_MOUSEBUTTONDOWN) {
            // If the user clicks while in the MENU state, switch to PLAYING state
            currentState = PLAYING;
            logToBrowser("Game started. Switching to PLAYING state.");
            Mix_PlayMusic(music, -1); // Play music in loop
        } else if (currentState == PLAYING && (event.type == SDL_KEYDOWN || event.type == SDL_KEYUP)) {
            // Adjust the square's velocity based on key press
            int vel = (event.type == SDL_KEYDOWN) ? 5 : 0;  
            
            switch (event.key.keysym.sym) {
                case SDLK_UP:
                case SDLK_w:
                    square.setVelY(-vel);  // Move up
                    break;
                case SDLK_DOWN:
                case SDLK_s:
                    square.setVelY(vel);   // Move down
                    break;
                case SDLK_LEFT:
                case SDLK_a:
                    square.setVelX(-vel);  // Move left
                    break;
                case SDLK_RIGHT:
                case SDLK_d:
                    square.setVelX(vel);   // Move right
                    break;
            }
        } else if (currentState == PLAYING && event.type == SDL_MOUSEBUTTONDOWN) {
            int mouseX = event.button.x; // Get the mouse X position
            int mouseY = event.button.y; // Get the mouse Y position

            // Create a new projectile at the square's position
            Mix_PlayChannel(-1, firingBulletMusic, 0);
            projectiles.emplace_back(square.getRect().x + square.getRect().w / 2 + 10, 
                                      square.getRect().y + square.getRect().h / 2 -10, 
                                      30, 25,10,0); // Width and height of the projectile
                                      
        } else if ((currentState == GAME_OVER || currentState == GAME_WIN )&& event.type == SDL_KEYDOWN && event.key.keysym.sym == SDLK_r) {
            // Restart the game
            square.setHealth(100); // Reset player's health
            enemies.clear(); // Clear enemies
            score = 0;
            phase = 1;
            projectiles.clear(); // Clear projectiles
            currentWave = 0; 
            boss.alive = false;
            initializeEnemies(Enemy::MovementPattern::Zigzag,2,0); // Reinitialize enemies
            Mix_PlayMusic(music, -1); // Play music in loop
            square.setVelX(0);
            square.setVelY(0);
            currentState = PLAYING; // Go back to playing state
        } else if (currentState == GAME_VICTORY && event.type == SDL_KEYDOWN &&  (event.key.keysym.sym == SDLK_KP_ENTER || event.key.keysym.sym == SDLK_RETURN)) {
            // Restart the game
            square.setHealth(100); // Reset player's health
            enemies.clear(); // Clear enemies
            projectiles.clear(); // Clear projectiles
            phase = 2;
            currentWave = 0; 
            boss.alive = false;
            initializeEnemies(Enemy::MovementPattern::Zigzag,3,1); // Reinitialize enemies
            Mix_PlayMusic(techMusic, -1); // Play music in loop
            square.setVelX(0);
            square.setVelY(0);
            currentState = PLAYING; // Go back to playing state
        }
    }

    // Clear the screen
    SDL_SetRenderDrawColor(renderer, 0, 0, 0, 255);  // Black background
    SDL_RenderClear(renderer);

    if (currentState == MENU) {
        // Render the galaxy background in the menu
        SDL_RenderCopy(renderer, galaxyTexture, NULL, NULL);

        titleTime += titleSpeed;
        titleY = titleAmplitude * sin(titleTime);

        SDL_Color titleColor = {255, 255, 255, 255}; 
        SDL_Color titleColorBlack = {0, 0, 0, 255}; // Black color
        const char* titleText = "TETRAFORCE";

        renderCenter(5, titleY+5, titleText, bigfont, titleColorBlack);
        renderCenter(0, titleY, titleText, bigfont, titleColor);

        int textWidth, textHeight;
        SDL_QueryTexture(textTexture, NULL, NULL, &textWidth, &textHeight);
        SDL_Rect textRect = { (WINDOW_WIDTH - textWidth) / 2, (WINDOW_HEIGHT - textHeight) * 4 / 6, textWidth, textHeight };
        SDL_RenderCopy(renderer, textTexture, NULL, &textRect);
        SDL_QueryTexture(moreTexture, NULL, NULL, &textWidth, &textHeight);
        SDL_Rect textRect2 = { (WINDOW_WIDTH - textWidth) / 2, (WINDOW_HEIGHT - textHeight) * 6 / 6, textWidth, textHeight };
        SDL_RenderCopy(renderer, moreTexture, NULL, &textRect2);

        SDL_RenderPresent(renderer);
    } 
    else if (currentState == PLAYING) {
        square.updatePosition(WINDOW_WIDTH, WINDOW_HEIGHT);

        for (auto it = projectiles.begin(); it != projectiles.end(); ) {
            it->update();  // Update projectile position

            bool projectileCollided = false;
            // Check collision with enemies
            for (auto enemyIt = enemies.begin(); enemyIt != enemies.end(); ) {
                SDL_Rect projectileRect = it->getRect();  // Store the projectile's rect
                SDL_Rect enemyRect = enemyIt->getRect();  // Store the enemy's rect

                if (SDL_HasIntersection(&projectileRect, &enemyRect)) {
                    // Collision detected, remove both the projectile and the enemy
                    Mix_PlayChannel(-1, enemyHitMusic, 0); // Play music in loop
                    enemyIt->decreaseHealth(1);
                    if (enemyIt->getHealth() <= 0){
                        score += 10; // Increment score by 10 (or any value you want)
                        enemyIt = enemies.erase(enemyIt);  // Remove the enemy
                    }
                    projectileCollided = true;
                    break;  // No need to check this projectile with other enemies
                } else {
                    ++enemyIt;
                }
            }

            // If projectile collided, remove it
            if (projectileCollided) {
                it = projectiles.erase(it);
            } else {
                ++it;
            }
        }

         // Update and render enemies

         for (Enemy& enemy : enemies) {
            enemy.update(enemyProjectiles, square);  // Pass enemy projectiles
        }

        // Update enemy projectiles
        for (auto it = enemyProjectiles.begin(); it != enemyProjectiles.end();) {
            it->update();
            if (it->getRect().x < 0) {  // Remove if it goes off-screen
                it = enemyProjectiles.erase(it);
            } else {
                ++it;
            }
        }

        for (auto it = bossProjectiles.begin(); it != bossProjectiles.end();) {
            it->update();
            if (it->getRect().x < 0) {  // Remove if it goes off-screen
                it = bossProjectiles.erase(it);
            } else {
                ++it;
            }
        }

        handleCollisions(square, enemyProjectiles);

        handleCollisions(square, bossProjectiles);

        // Update scroll positions
        scrollPosition1 += scrollSpeed;
        scrollPosition2 += scrollSpeed;

        // Reset positions when they go off-screen
        if (scrollPosition1 >= 2560) {  // When the first background goes off-screen
            scrollPosition1 = 0.0f;
        }
        if (scrollPosition2 >= 2560) {  // When the second background goes off-screen
            scrollPosition2 = 0.0f;
        }

        // Define the source rectangles from the background texture
        SDL_Rect srcRect1 = { static_cast<int>(scrollPosition1), 0, WINDOW_WIDTH, WINDOW_HEIGHT };
        SDL_Rect srcRect2 = { static_cast<int>(scrollPosition2), 0, WINDOW_WIDTH, WINDOW_HEIGHT };

        // Render the first background texture
        SDL_RenderCopy(renderer, backgroundTexture, &srcRect1, NULL);
        // Render the second background texture
        SDL_RenderCopy(renderer, backgroundTexture, &srcRect2, NULL);

        // Render the square
        square.render(renderer, playerTexture);

        if (square.getHealth() <= 0){
            currentState = GAME_OVER; 
        }

        for (auto& projectile : bossProjectiles) {
            projectile.render(renderer, bulletTexture2);
        }

        for ( auto& projectile : projectiles) {
            projectile.render(renderer, bulletTexture);
        }

        for (Enemy& enemy : enemies) {
            enemy.render(renderer,enemyTexture);  // Render the enemy
        }

        for (auto& projectile : enemyProjectiles) {
            projectile.render(renderer, bulletTexture);
        }

        renderHealthBar(renderer, square.getHealth(), square.getMaxHealth());
        renderScore(renderer, score); // Add this line to render the score

        if (enemies.empty() && currentWave == 0) {
            // Spawn a new batch of enemies
            heart.x = 50; // Random x position
            heart.y = (WINDOW_HEIGHT - 90); // Random y position
            heart.w = 50; // Width of the heart
            heart.h = 50; // Height of the heart

            heartVisible = true;  // Make the heart visible
            heartSpawnTime = SDL_GetTicks(); // Store the spawn time
            currentWave = 1;
            initializeEnemies(Enemy::MovementPattern::Circular,2,0);
        }

        if (enemies.empty() && currentWave == 1 && !boss.alive) {
            // All enemies of the second batch are defeated, trigger boss spawn
            boss.alive = true;
        }


        if (boss.alive) {
            boss.move();
            boss.shoot(bossProjectiles);  // Boss shoots bullets
            boss.displayHealth(renderer);

            // Render the boss
            SDL_Rect renderRect = { boss.rect.x, boss.rect.y, 120, 120 };
            SDL_RenderCopy(renderer, bossTexture, nullptr, &renderRect);

            // Check for collisions between player bullets and boss
         
            for (auto it = projectiles.begin(); it != projectiles.end(); ) {
                SDL_Rect projectileRect = it->getRect();
                if (SDL_HasIntersection(&projectileRect, &boss.rect)) {
                    // Handle bullet hit logic here (e.g., decrease boss health)
                    boss.health--;
                    // Erase the bullet from the vector and return an iterator to the next element
                    it = projectiles.erase(it);
                } else {
                    ++it; // Move to the next projectile if no collision
                }
            }

            // Check if the boss is defeated
            if (boss.health <= 0) {
                boss.alive = false;
                // Trigger end game, next phase, or display victory screen
                if (phase == 2)
                {
                    currentState = GAME_WIN;
                } else if ( phase == 1){
                    currentState = GAME_VICTORY; 
                }
                // Or any other state you want to set
            }
        }
        
        if (heartVisible && !heartCollected) {
            if (square.getX() < heart.x + heart.w && square.getX() + square.getSize() > heart.x &&
                square.getY() < heart.y + heart.h && square.getY() + square.getSize() > heart.y) {
                heartCollected = true;
                heartVisible = false;
                square.addHealth(50);
            }
        }

        // Remove the heart after 10 seconds
        if (heartVisible && (SDL_GetTicks() - heartSpawnTime >= heartDuration)) {
            heartVisible = false;
        }

        if (heartVisible && !heartCollected) {
            SDL_RenderCopy(renderer, heartTexture, NULL, &heart);
        }

        // Present the new frame
        SDL_RenderPresent(renderer);
    }
    else if (currentState == GAME_OVER || currentState == GAME_WIN) {
        if (currentState == GAME_OVER){
            renderGameOver("GAME OVER! HIGHSCORE: " + std::to_string(score) + " Press R to Restart");  // Render the game over screen
        } else if (currentState == GAME_WIN){
            renderGameOver("YOU WON! HIGHSCORE: " + std::to_string(score) + " Press R to Restart");  // Render the game over screen
        }
        Mix_HaltMusic();
        bossProjectiles.clear();
        enemyProjectiles.clear();
        heartVisible = false;
        boss.health = 25;
        heartCollected = false;
        // Present the new frame
        SDL_RenderPresent(renderer);
    }
    else if (currentState == GAME_VICTORY) {
        renderGameOver("PRESS ENTER FOR NEXT PHASE ( VERY HARD! )");  // Render the game over screen
        Mix_HaltMusic();
        bossProjectiles.clear();
        heartVisible = false;
        boss.health = 25;
        heartCollected = false;
        // Present the new frame
        SDL_RenderPresent(renderer);
    }
}

int main(int argc, char* argv[]) {
    // Initialize SDL
    if (SDL_Init(SDL_INIT_VIDEO | SDL_INIT_AUDIO) != 0) {
        logToBrowser("SDL_Init Error: " + std::string(SDL_GetError()));
        return 1;
    }

    // Initialize SDL_image
    if (IMG_Init(IMG_INIT_PNG) == 0) {
        logToBrowser("IMG_Init Error: " + std::string(IMG_GetError()));
        SDL_Quit();
        return 1;
    }

    // Initialize SDL_ttf
    if (TTF_Init() == -1) {
        logToBrowser("TTF_Init Error: " + std::string(TTF_GetError()));
        SDL_Quit();
        return 1;
    }

    // Load the font
    font = TTF_OpenFont("assets/font.ttf", 64);
    bigfont = TTF_OpenFont("assets/font.ttf", 158);
    if (!bigfont) {
        logToBrowser("Failed to load bigfont: " + std::string(TTF_GetError()));
        TTF_Quit();
        SDL_Quit();
        return 1;
    }
    if (!font) {
        logToBrowser("Failed to load font: " + std::string(TTF_GetError()));
        TTF_Quit();
        SDL_Quit();
        return 1;
    }

    subfont = TTF_OpenFont("assets/subfont.ttf", 24);
    if (!subfont) {
        logToBrowser("Failed to load subfont: " + std::string(TTF_GetError()));
        TTF_Quit();
        SDL_Quit();
        return 1;
    }

    // Initialize SDL_mixer
    if (Mix_OpenAudio(44100, MIX_DEFAULT_FORMAT, 2, 2048) == -1) {
        logToBrowser("Mix_OpenAudio Error: " + std::string(Mix_GetError()));
        SDL_Quit();
        return 1;
    }

    // Load the music
    music = Mix_LoadMUS("assets/galaxytrack1.ogg");
    techMusic = Mix_LoadMUS("assets/hardtrack.ogg");
    enemyHitMusic = Mix_LoadWAV("assets/enemyhit.ogg");
    playerHitMusic = Mix_LoadWAV("assets/playerhit.ogg");
    firingBulletMusic = Mix_LoadWAV("assets/firingbullet.ogg");
    if (!music) {
        logToBrowser("Failed to load music: " + std::string(Mix_GetError()));
        SDL_Quit();
        return 1;
    }

     if (!techMusic) {
        logToBrowser("Failed to load techMusic: " + std::string(Mix_GetError()));
        SDL_Quit();
        return 1;
    }

    // Create the window
    window = SDL_CreateWindow("TETRAFORCE", 
                              SDL_WINDOWPOS_CENTERED, 
                              SDL_WINDOWPOS_CENTERED, 
                              WINDOW_WIDTH, WINDOW_HEIGHT, 
                              SDL_WINDOW_SHOWN);
    if (!window) {
        logToBrowser("SDL_CreateWindow Error: " + std::string(SDL_GetError()));
        SDL_Quit();
        return 1;
    }

    // Create the renderer
    renderer = SDL_CreateRenderer(window, -1, SDL_RENDERER_ACCELERATED);
    if (!renderer) {
        logToBrowser("SDL_CreateRenderer Error: " + std::string(SDL_GetError()));
        SDL_DestroyWindow(window);
        SDL_Quit();
        return 1;
    }

    // Load the galaxy texture for the menu background
    galaxyTexture = loadTexture("assets/wallpaper.png", renderer);
    if (!galaxyTexture) {
        logToBrowser("Failed to load galaxy texture.");
    }

    // Load the text texture
    SDL_Color white = { 255, 255, 255, 255 };
    textTexture = renderText("LEFT CLICK TO START", white, renderer, font);
    if (!textTexture) {
        logToBrowser("Failed to render text.");
    }
    moreTexture = renderText("PRESS W A S D / ARROW KEYS TO MOVE / LEFT CLICK TO SHOOT", white, renderer, subfont);
    if (!moreTexture) {
        logToBrowser("Failed to render moreText.");
    }
    // Load the background texture for the playing state
    backgroundTexture = loadTexture("assets/star.png", renderer);
    if (!backgroundTexture) {
        logToBrowser("Failed to load background texture.");
    }

    playerTexture = loadTexture("assets/rocket.png", renderer);  // Path to your PNG file
    if (!playerTexture) {
        logToBrowser("Failed to load player texture.");
    }

    bulletTexture = loadTexture("assets/bullet.png", renderer);  // Path to your PNG file
    if (!bulletTexture) {
        logToBrowser("Failed to load bullet texture.");
    }


    bulletTexture2 = loadTexture("assets/bullet2.png", renderer);  // Path to your PNG file
    if (!bulletTexture2) {
        logToBrowser("Failed to load bullet2 texture.");
    }

    enemyTexture = loadTexture("assets/enemy.png", renderer);  // Path to your enemy PNG file
    if (!enemyTexture) {
        logToBrowser("Failed to load enemy texture.");
    }

    bossTexture = loadTexture("assets/boss.png", renderer);  // Path to your boss PNG file
    if (!bossTexture) {
        logToBrowser("Failed to load boss texture.");
    }


    heartTexture = loadTexture("assets/heart.png",renderer);
    if (!heartTexture) {
        logToBrowser("Failed to load heart texture .");
    }

    initializeEnemies(Enemy::MovementPattern::Zigzag,2,0);

    // Set the main loop to be executed by Emscripten
    emscripten_set_main_loop(main_loop, 0, 1);

    // Cleanup (This part will never be reached in this example)
    SDL_DestroyTexture(backgroundTexture);
    SDL_DestroyTexture(galaxyTexture);
    SDL_DestroyTexture(textTexture);
    SDL_DestroyTexture(moreTexture);
    SDL_DestroyTexture(playerTexture);
    SDL_DestroyTexture(bulletTexture);
    SDL_DestroyTexture(bulletTexture2);
    SDL_DestroyTexture(enemyTexture);
    SDL_DestroyTexture(bossTexture);
    TTF_CloseFont(font);
    TTF_CloseFont(subfont);
    TTF_CloseFont(bigfont);
    SDL_DestroyRenderer(renderer);
    SDL_DestroyWindow(window);
    TTF_Quit();  // Cleanup SDL_ttf
    Mix_FreeMusic(music);
    Mix_FreeMusic(techMusic);
    Mix_FreeChunk(playerHitMusic);
    Mix_FreeChunk(enemyHitMusic);
    Mix_FreeChunk(firingBulletMusic);
    Mix_CloseAudio();  // Cleanup SDL_mixer
    IMG_Quit();  // Cleanup SDL_image
    SDL_Quit();  // Cleanup SDL

    return 0;  // Program will never reach this point
}
