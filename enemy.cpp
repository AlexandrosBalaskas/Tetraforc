#include "enemy.h"
#include <chrono>
#include <cstdlib>  
#include "logging.h"


Enemy::Enemy(int x, int y, int size, int velX, int velY, int initialHealth, MovementPattern pattern , int positionX)
    : x(x), y(y), size(size), velX(velX), velY(velY), state(0), isPaused(false), health(initialHealth), maxHealth(initialHealth), positionX(positionX),
      movementPattern(pattern), angle(0), radius(50), centerX(x), centerY(y), direction(1), moveTimer(0), changeInterval(30) {}

void Enemy::update(std::vector<Projectile>& enemyProjectiles, Square player) {
    switch (state) {
        case 0: // Linear movement to the center of the screen
            x += velX;
            if (x <= (1280 - size + positionX) / 2) {
                x = (1280 - size + positionX) / 2;
                state = 1; // Transition to state 1 (pause before action)
                isPaused = true;
                pauseStartTime = std::chrono::steady_clock::now();
                lastShotTime = std::chrono::steady_clock::now();  // Initialize the last shot time
            }
            break;

        case 1: // Pause and then start movement pattern
            if (isPaused) {
                auto currentTime = std::chrono::steady_clock::now();
                auto elapsed = std::chrono::duration_cast<std::chrono::seconds>(currentTime - pauseStartTime).count();
                if (elapsed >= 1) {  // After 1 second, start movement pattern
                    isPaused = false;
                    state = 2; // Transition to movement pattern state
                    centerX = x; // Set current position as the center for circular movement
                    centerY = y;
                    angle = 0;  // Reset angle for circular movement
                }
            }
            break;

        case 2: // Execute selected movement pattern and shoot periodically
            // Movement pattern logic
            switch (movementPattern) {
                case MovementPattern::Zigzag:
                    y += velY * direction;
                    if (moveTimer >= changeInterval) {
                        direction *= -1;  // Reverse direction for zigzag
                        moveTimer = 0;
                    }
                    moveTimer++;
                    break;

                case MovementPattern::Circular:
                    x = centerX - 50 + radius * cos(angle);
                    y = centerY + radius * sin(angle);
                    angle += 0.05f;  // Adjust speed of rotation
                    break;

                default:  // Linear movement
                    x += velX;
                    y += velY;
                    break;
            }

            
            auto currentTime = std::chrono::steady_clock::now();
            auto timeSinceLastShot = std::chrono::duration_cast<std::chrono::milliseconds>(currentTime - lastShotTime).count();
            if (timeSinceLastShot >= shootInterval) {
                shoot(enemyProjectiles);  // Fire projectiles
                lastShotTime = currentTime;  // Update the last shot time
            }
            break;
    }

    // If the enemy goes off the screen, reset its position
    if (y > 720) {
        x = 1280;
        y = rand() % 600;
        state = 0;  // Reset state to 0 (linear movement)
    }
}


void Enemy::shoot(std::vector<Projectile>& enemyProjectiles) {
    // Create a new projectile moving left from the enemy's position
    enemyProjectiles.push_back(Projectile(x, y + size / 2, 25, 20, -5, 0));  
}

void Enemy::render(SDL_Renderer* renderer, SDL_Texture* texture) const {
    SDL_Rect renderRect = { x, y, size, size };
    SDL_RenderCopy(renderer, texture, nullptr, &renderRect);

     // Render health bar
    if (health < maxHealth) {
        int barWidth = size; // Width of the health bar
        int barHeight = 5; // Height of the health bar
        SDL_Rect healthBar = { x, y - barHeight, barWidth, barHeight }; // Position it above the enemy
        SDL_SetRenderDrawColor(renderer, 255, 0, 0, 255); // Red color for the health bar background
        SDL_RenderFillRect(renderer, &healthBar);

        // Calculate the health ratio
        float healthRatio = static_cast<float>(health) / maxHealth;
        SDL_Rect healthFill = { x, y - barHeight, static_cast<int>(barWidth * healthRatio), barHeight }; // Width based on current health
        SDL_SetRenderDrawColor(renderer, 0, 255, 0, 255); // Green color for the health fill
        SDL_RenderFillRect(renderer, &healthFill);
    }
}

SDL_Rect Enemy::getRect() const {
    return { x, y, size, size };
}

void Enemy::decreaseHealth(int amount) {
        health -= amount;
}
