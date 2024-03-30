<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Jose-AE/osomar-script">
    <img src="https://i.imgur.com/gXMwYJF.png" alt="Logo" width="80" height="80">
  </a>
<h3 align="center">OsomarScript</h3>

  <p align="center">
    A programming language inspired by JavaScript and infused with the vibrant vibe of Osomar. It is designed to be simple and functional, serving as a proof of concept for making a compiler.
    <br />
    <a href="https://github.com/Jose-AE/osomar-script"></a>
    <br />
    <a href="https://github.com/Jose-AE/osomar-script/issues">Report Bug</a>
    ·
    <a href="https://github.com/Jose-AE/osomar-script/issues">Request Feature</a>

  </p>
</div>

<!-- ABOUT THE PROJECT -->

# Getting Started

## Installation

```bash
$ npm install osomar-script -g
```

Alternatively, you can download the binaries from the [release page](https://github.com/Jose-AE/osomar-script/releases) and use them directly, bypassing the npm installation.

## Usage

```bash
$ os <filename>.os
```

## Your First Program

To begin writing OsomarScript code, create a new file with a .os extension and start coding. Here's a simple "Hello, World!" program:

```js
// hello.os
ctm("Hello World") jajaja
```

# Language Basics

## Syntax

- Comment: `//`
- Statement End: `jajaja`
- Code Block Start: `"🃏`
- Code Block End: `🃏"`

## Data Types

- `number`: Numeric data type for integers and floating-point numbers.
- `string`: Textual data enclosed in double quotes.
- `falso`: Logical data type representing False
- `verdad`: Logical data type representing true
- `sepa dios`: Represents an intentional absence of any value (null).

## Variables

Variables are declared using the `Ei` keyword, and can be initalized when declared.

```js
// Uninitialized variable
Ei x jajaja

// Initialized variable
Ei y es 10 jajaja
```

## Operators

- Arithmetic Operators: `+`, `-`, `*`, `/`
- Comparison Operators: `==`, `!=`, `>`, `<`, `>=`, `<=`
- Logical Operators: `&&`, `||`
- Assignment Operator: `es`

## Control Structures

### While loop

- Executes a block of code wrapped in `"🃏 🃏"` as long as the condition inside `()` evaluates to true.

- Declared using the `no digas mamadas mientras` keyword.
- Break out of the block of code with the keyword `mamo`

```
no digas mamadas mientras (condition) "🃏

  //Code

🃏"


//Infinite loop with break keword
no digas mamadas mientras (verdad) "🃏

  ctm("start") jajaja //will run

  mamo jajaja //break out of loop

  ctm("end") jajaja //won't run

🃏"
```

### If Statement

- The if statement allows you to execute a block of code wrapped in `"🃏 🃏"` conditionally based on the condition inside `()`.
- Declared using the `hijo mio si` keyword.
- Use the `de lo contrario` keyword to define what to do if the condition is not true.

```
//Example 3
hijo mio si (condiition) "🃏

  //Code

🃏"


//Example 2
hijo mio si (condiition) "🃏

  //Code if true

🃏" de lo contrario "🃏

  //Code if false

🃏"


```

You can chain If Statements

```
//Example 3

hijo mio si (condition_1) "🃏

  //if cond 1

🃏" de lo contrario hijo mio si (condition_2) "🃏

  //if cond 2

🃏" de lo contrario "🃏

  //else

🃏"
```

## Printing

OsomarScript provides a print function to display output to the console, call it with `ctm()`

```
ctm("Hello world") jajaja
```

## Functions

Functions allow you to encapsulate reusable pieces of code. They can be declared using the `we` keyword and can accept parameters and return values with the keyword `nmms`.

```
we square(num) "🃏
  nmms num * num jajaja //return num * num
🃏"

ctm(square(5)) jajaja // Output: 25

```

# Example Program

```
// Variables
Ei miNombre es "Osomar" jajaja
Ei miNumero es 5 jajaja
Ei miVerdadero es verdad jajaja
Ei miFalso es falso jajaja
Ei miNull es sepa dios jajaja


//Printing
ctm(miNombre) jajaja

// Conditional statement
Ei x es 1 jajaja

hijo mio si (x == 1) "🃏

  ctm("Num 1") jajaja

🃏" de lo contrario hijo mio si (x==2) "🃏

  ctm("Num 2") jajaja

🃏" de lo contrario "🃏

  ctm("Num any") jajaja

🃏"


// Function
we square(num) "🃏
  nmms num * num jajaja //return num * num
🃏"

ctm(square(5)) jajaja // Output: 25


// While loop
Ei countdown es 3 jajaja
no digas mamadas mientras (countdown > 0) "🃏

  ctm(countdown)jajaja
  countdown es countdown - 1 jajaja

🃏"


no digas mamadas mientras (verdad) "🃏

  ctm("Solo se corre una vez") jajaja
  mamo jajaja //Break

🃏"
```
