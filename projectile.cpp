#include "projectile.h"
#include "logging.h"
#include <iostream>

Projectile::Projectile(int x, int y, int w, int h, int velX, int velY)
    : x(x), y(y), w(w), h(h), velX(velX), velY(velY) {}

void Projectile::update() {
    x += velX;
    y += velY;
}

void Projectile::render(SDL_Renderer* renderer, SDL_Texture* texture) {
    SDL_Rect rect = { x, y, w, h };
    SDL_RenderCopy(renderer, texture, nullptr, &rect); 
}

SDL_Rect Projectile::getRect() const {
    return { x, y, w, h };
}
