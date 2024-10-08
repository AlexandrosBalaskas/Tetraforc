#ifndef SQUARE_H
#define SQUARE_H

#include <SDL.h>

class Square {
public:
    Square(int x, int y, int size, int velX, int velY, int health);
    void updatePosition(int windowWidth, int windowHeight);
    void render(SDL_Renderer* renderer, SDL_Texture* texture);
    void setVelX(int newVelX);  // Set velocity in the X direction
    void setVelY(int newVelY);  // Set velocity in the Y direction
    SDL_Rect getRect() const;
    void decreaseHealth(int amount); // Decrease health when hit
    int getHealth() const; // Get current health
    int getMaxHealth() const; // Get max health
    int getX() const { return x; }
    int getY() const { return y; }
    int getSize() const { return size; }
    void setHealth(int amount) { currentHealth = amount;}
    void addHealth(int amount);

private:
    int x, y;       // Position
    int size;       // Size of the square
    int velX, velY; // Velocity
    int currentHealth; // Player current health
    int maxHealth;     // Player maximum health
};

#endif