# Tetraforce

Tetraforce is a game using C++ and [SDL2](https://www.libsdl.org/).

## Compiling
After installing [Mingw64](https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/8.1.0/threads-win32/seh/x86_64-8.1.0-release-win32-seh-rt_v6-rev0.7z/download), [SDL2](https://www.libsdl.org/download-2.0.php), [SDL_Image](https://www.libsdl.org/projects/SDL_image/), [SDL_TTF](https://www.libsdl.org/projects/SDL_ttf/), and [SDL_Mixer](https://www.libsdl.org/projects/SDL_mixer/), execute the following command in the project's root directory:
```
g++ -c *.cpp -std=c++14 -O3 -Wall -m64 -I include -I C:/SDL2-w64/include && g++ *.o -o bin/release/main -s -L C:/SDL2-w64/lib -lmingw32 -lSDL2main -lSDL2 -lSDL2_image -lSDL2_ttf -lSDL2_mixer && start bin/release/main 
```
You need to be in the pc branch.

The compiled ``.exe`` is located in ``./bin``. For it to run, you must copy all ``.dll`` files from your SDL installation to its directory.

## Web Compiling with Emscripten
First install [Emscripten](https://emscripten.org/docs/getting_started/downloads.html) 
After run in the console 
```
emcc main.cpp square.cpp projectile.cpp enemy.cpp logging.cpp -s USE_SDL=2 -s USE_SDL_IMAGE=2 -s SDL2_IMAGE_FORMATS=['png'] -s USE_SDL_TTF=2 -s USE_SDL_MIXER=2 -s USE_VORBIS=1 -s USE_OGG=1 -s EXPORTED_RUNTIME_METHODS="['cwrap', 'ccall']" -s -s LINKABLE=1 -s EXPORT_ALL=1 --preload-file assets -o index.html
```
You need to be in main branch.
Emscripten transformed the code into one html and one js files which you can serve to the web.
