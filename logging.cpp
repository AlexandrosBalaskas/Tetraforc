#include "logging.h"
#include <emscripten/emscripten.h>

void logToBrowser(const std::string& message) {
    std::string escapedMessage = message;
    size_t pos = 0;
    while ((pos = escapedMessage.find("'", pos)) != std::string::npos) {
        escapedMessage.replace(pos, 1, "\\'");
        pos += 2; // Move past the escaped character
    }

    std::string jsCommand = "console.log('" + escapedMessage + "');";
    emscripten_run_script(jsCommand.c_str());
}