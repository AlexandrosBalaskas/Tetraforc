#ifndef PROJECTILE_H
#define PROJECTILE_H

#include <SDL.h>

class Projectile {
public:
    Projectile(int x, int y, int w, int h, int velX, int velY);

    void update();
    void render(SDL_Renderer* renderer, SDL_Texture* texture) ;
    SDL_Rect getRect() const;
    int getX() const { return x; }
    int getY() const { return y; }
    int getWidth() const { return w; }
    int getHeight() const { return h; }

private:
    int x, y; // Position
    int w, h; // Width and height of the projectile
    int velX, velY; // Velocity in the X and Y directions
};

#endif
