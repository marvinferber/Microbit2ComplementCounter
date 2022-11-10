# Microbit
def zwk2dez(binin: str) -> number:
    numbits = len(binin)
    converted = ""
    if binin[0] == "1":
        i = 0
        while i < numbits:
            converted += str(2 ** int(binin[i]) % 2)
            i += 1
    else:
        converted = binin
    number = 0
    for i in range(numbits):
        number += 2 ** i * int(converted[numbits - i - 1])
    return -1 * (number + 1) if binin[0] == "1" else number

def dez2zwk(dezin: number) -> str:
    neg = True if dezin <0 else False
    num = -1*dezin-1 if neg else dezin
    binaer = ""
    while True:
        tmp = num // 2
        rest = num % 2
        binaer = str(rest) + binaer
        if tmp == 0:
            break
        num = tmp
    binaer = "0"+binaer
    if neg:
        zw=""
        for i in range(len(binaer)):
            zw += "0" if binaer[i] == "1" else "1"
        return zw
    else:
        return binaer

def on_button_pressed_a():
    global zahl, zwkstring
    zahl = zahl + 1
    zwkstring = dez2zwk(zahl)
    length = len(zwkstring)
    while length < 5:
        zwkstring = zwkstring[0] + zwkstring
        length += 1

def on_button_pressed_b():
    global zahl, zwkstring
    zahl = zahl - 1
    zwkstring = dez2zwk(zahl)
    length = len(zwkstring)
    while length < 5:
        zwkstring = zwkstring[0] + zwkstring
        length += 1

def on_forever():
    global zwkstring, zahl
    if zahl > 15 or zahl < -16:
        basic.show_icon(IconNames.CONFUSED)
        basic.pause(1000)
        basic.clear_screen()
        zahl = 0
        zwkstring = dez2zwk(zahl)
    for x in range(5):
        led.unplot(x, 0)
    for x in range(len(zwkstring)):
        if zwkstring[x] == "1":
            led.plot(x, 0)
    basic.pause(100)

basic.forever(on_forever)
input.on_button_pressed(Button.A, on_button_pressed_a)
input.on_button_pressed(Button.B, on_button_pressed_b)

zahl = 0
zwkstring = dez2zwk(zahl) 
#basic.show_number(zwk2dez("011"))