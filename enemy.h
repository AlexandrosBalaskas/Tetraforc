#include "projectile.h"
#include "square.h"
#include <vector>

class Enemy {
public:

    enum class MovementPattern {
        Circular,
        Zigzag,
    };
    Enemy(int x, int y, int size, int velX, int velY, int initialHealth, MovementPattern pattern = MovementPattern::Zigzag, int positionX = 0);

    void update(std::vector<Projectile>& enemyProjectiles, Square player); 
    void render(SDL_Renderer* renderer, SDL_Texture* texture) const;
    SDL_Rect getRect() const;
    void decreaseHealth(int amount); 
    int getHealth() const { return health; }
    int getMaxHealth() const { return maxHealth; }
    void setMovementPattern(MovementPattern pattern);

private:
    int x, y, size;
    int velX, velY;
    int health;
    int maxHealth;
    int state;
    bool isPaused;
    std::chrono::steady_clock::time_point pauseStartTime;
    std::chrono::steady_clock::time_point lastShotTime;  // Track the last time the enemy shot
    int shootInterval = 2000;  // Time interval between shots in milliseconds (2 seconds)
    bool canShoot;  // Whether the enemy can shoot

    void shoot(std::vector<Projectile>& enemyProjectiles);  
    MovementPattern movementPattern;
    
    // Circular movement variables
    float angle;
    float radius;
    int centerX, centerY;

    // Zigzag movement variables
    int direction;
    int moveTimer;
    int changeInterval;
    int positionX;
};
