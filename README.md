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
we MiFuncion(num) "🃏
  nmms num * num jajaja
🃏"

ctm(square(5)) jajaja // Output: 25


// While loop
Ei countdown es 3 jajaja
no digas mamadas mientras (countdown > 0) "🃏

  ctm(countdown)jajaja
  countdown es countdown - 1 jajaja

🃏"
```

![alt](https://i.imgur.com/e23go7G.png)

# Grammar (OUTDATED)

**PROGRAM** ⟶ STATEMENT\*

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
