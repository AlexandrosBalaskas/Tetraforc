#include "square.h"

Square::Square(int x, int y, int size, int velX, int velY, int health)
    : x(x), y(y), size(size), velX(velX), velY(velY), currentHealth(health), maxHealth(health)  {}

void Square::updatePosition(int windowWidth, int windowHeight) {
    x += velX;
    y += velY;

    if (x + size > windowWidth || x < 0) {
        velX = -velX;  
    }
    if (y + size > windowHeight || y < 0) {
        velY = -velY;  
    }
}

void Square::render(SDL_Renderer* renderer, SDL_Texture* texture) {
    SDL_Rect renderRect = { x, y, size, size };  

    SDL_RenderCopy(renderer, texture, nullptr, &renderRect);
}

void Square::setVelX(int newVelX) {
    velX = newVelX;
}

void Square::setVelY(int newVelY) {
    velY = newVelY;
}

SDL_Rect Square::getRect() const {
    return { x, y, size, size };  // Return an SDL_Rect representing the square
}

void Square::decreaseHealth(int amount) {
    currentHealth -= amount;
    if (currentHealth < 0) {
        currentHealth = 0; // Prevent health from going negative
    }
}

int Square::getHealth() const {
    return currentHealth;
}

int Square::getMaxHealth() const {
    return maxHealth;
}

void Square::addHealth(int amount)  {
    currentHealth += amount;
    if (currentHealth > maxHealth) {
        currentHealth = 100;
    }
}
