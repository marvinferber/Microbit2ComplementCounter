//  Microbit
function zwk2dez(binin: string): number {
    let i: number;
    let numbits = binin.length
    let converted = ""
    if (binin[0] == "1") {
        i = 0
        while (i < numbits) {
            converted += "" + 2 ** parseInt(binin[i]) % 2
            i += 1
        }
    } else {
        converted = binin
    }
    
    let number = 0
    for (i = 0; i < numbits; i++) {
        number += 2 ** i * parseInt(converted[numbits - i - 1])
    }
    return binin[0] == "1" ? -1 * (number + 1) : number
}

function dez2zwk(dezin: number): string {
    let tmp: number;
    let rest: any;
    let zw: string;
    let neg = dezin < 0 ? true : false
    let num = neg ? -1 * dezin - 1 : dezin
    let binaer = ""
    while (true) {
        tmp = Math.idiv(num, 2)
        rest = num % 2
        binaer = "" + rest + binaer
        if (tmp == 0) {
            break
        }
        
        num = tmp
    }
    binaer = "0" + binaer
    if (neg) {
        zw = ""
        for (let i = 0; i < binaer.length; i++) {
            zw += binaer[i] == "1" ? "0" : "1"
        }
        return zw
    } else {
        return binaer
    }
    
}

basic.forever(function on_forever() {
    let x: number;
    
    if (zahl > 15 || zahl < -16) {
        basic.showIcon(IconNames.Confused)
        basic.pause(1000)
        basic.clearScreen()
        zahl = 0
        zwkstring = dez2zwk(zahl)
    }
    
    for (x = 0; x < 5; x++) {
        led.unplot(x, 0)
    }
    for (x = 0; x < zwkstring.length; x++) {
        if (zwkstring[x] == "1") {
            led.plot(x, 0)
        }
        
    }
    basic.pause(100)
})
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    zahl = zahl + 1
    zwkstring = dez2zwk(zahl)
    let length = zwkstring.length
    while (length < 5) {
        zwkstring = zwkstring[0] + zwkstring
        length += 1
    }
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    zahl = zahl - 1
    zwkstring = dez2zwk(zahl)
    let length = zwkstring.length
    while (length < 5) {
        zwkstring = zwkstring[0] + zwkstring
        length += 1
    }
})
let zahl = 0
let zwkstring = dez2zwk(zahl)
