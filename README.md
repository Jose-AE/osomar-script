# Grammar

**PROGRAM** ⟶ STATEMENT_LIST

**STATEMENT_LIST** ⟶ STATEMENT | (STATEMENT_LIST STATEMENT)

**STATEMENT** ⟶ DECLARATION | ASSIGNMENT | IF_STATEMENT | WHILE_LOOP | PRINT_STATEMENT

**DECLARATION_KEYWORD** ⟶ "Ei"

**DECLARATION** ⟶ DECLARATION_KEYWORD IDENTIFIER (ASSIGNMENT_SYMBOL EXPRESSION)? LINE_END

**ASSIGNMENT_SYMBOL** ⟶ "es"

**ASSIGNMENT** ⟶ IDENTIFIER ASSIGNMENT_SYMBOL EXPRESSION LINE_END

**IF_KEYWORD** ⟶ "si"

**ELSE_KEYWORD** ⟶ "aparte"

**IF_STATEMENT** ⟶ IF_KEYWORD OPEN_PARE CONDITION CLOSE_PARE BLOCK_START STATEMENT_LIST BLOCK_END (ELSE_KEYWORD BLOCK_START STATEMENT_LIST BLOCK_END)?

**WHILE_KEYWORD** ⟶ "mientras"

**WHILE_LOOP** ⟶ WHILE_KEYWORD OPEN_PARE CONDITION CLOSE_PARE BLOCK_START STATEMENT_LIST BLOCK_END

**PRINT_STATEMENT** ⟶ "ctm" OPEN_PARE EXPRESSION CLOSE_PARE LINE_END

**CONDITION** ⟶ EXPRESSION CONDITIONAL_SYMBOL EXPRESSION

**EXPRESSION** -> TERM | EXPRESSION "+" TERM | EXPRESSION "-" TERM

**TERM** ⟶ FACTOR | TERM "\*" FACTOR | TERM "/" FACTOR

**FACTOR** ⟶ IDENTIFIER | NUMBER | OPEN_PARE EXPRESSION CLOSE_PARE

**IDENTIFIER** -> LETTER (LETTER | DIGIT)\*

**LETTER** -> "a" | ... | "z" | "A" | ... | "Z"

**NUMBER** -> (DIGIT\* ".")?DIGIT+

**DIGIT** -> "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"

**BLOCK_START** ⟶ "jajaja"

**BLOCK_END** ⟶ "nmms"

**CONDITIONAL_SYMBOL** ⟶ "==" | "!=" | "<" | ">" | "<=" | ">="

**OPEN_PARE** ⟶ "("

**CLOSE_PARE** ⟶ ")"

**LINE_END** ⟶ "."

# Example Program

```

//Variable declaration and assignment
Ei myName es "Alice".

// Printing values
ctm("Hello World").


// Conditional statements
si (age < 18/2)
    jajaja
        ctm("You are a minor.").
    nmms

aparte si (age >= 18 && age < 65)
    jajaja
        ctm("You are an adult.").
    nmms
aparte
    jajaja
        ctm("You are a senior citizen.").
    nmms

// Looping
para (Ei i = 0. i < 5. i=i+ 1)
    jajaja
        ctm(i)
    nmms

// Arrays
Ei fruits = ["apple", "banana", "orange"].
ctm("Fruits:", fruits).

// Functions
we myFunction(Ei name)
    jajaja
        ctm("Hello, " + name).
    nmms

// Function call
myFunction("Bob").

```

![alt](https://i.imgur.com/e23go7G.png)

# Syntax

**JS:**

Expression statement: x + y;

Variable declaration: let x = 5;

Assignment: x = 10;

Function declaration: function myFunction(arg1, arg2) {}

Return statement: return true;

Conditional statement: if (x === 5) { /_ code block _/ } else

Loop statement: while (false) { /_ code block _/ }

Null: null

**OsomarScript:**

Expression statement: x + y jajaja

Assignment: x es 10 jajaja

Variable declaration: Ei x es 5 jajaja

Function declaration: we miOsmarfuncion(arg1, arg2) "🃏 🃏"

Return statement: nmms verdad jajaja

Conditional statement: hijo mio si (x == 5) "🃏 🃏" de lo contrario

Loop statement: no digas mamadas mientras (falso) "🃏 🃏"

Null: sepa dios
