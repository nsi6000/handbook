# Introduction

## Definition
This handbook is a collection of *learning references* to support undergraduate studies, mainly in the domains of science & applied sciences.

The *learning references* decompose into 4 types:
1. textbooks.
2. study guides / answer books.
3. coloring books.
4. flash cards.

All *learning references* are broken down into *domains* (as Markdown Header 1) and *sub-domains* (as Markdown Header 2).

The canonical form of a *learning reference* is:
1. A title,
2. A list of authors,
3. A list of ISBN-13.

The regular expression of a *learning reference* is:
```
//(list sequence as integer). (title as string) - (list of authors as string separated by comma). (list of ISBN-13 codes as numbers enclosed in parenthesis separated by space).
\d+\.\s[a-zA-Z]+\s-\s[a-zA-Z\s\.\,]+(\(978\-\d{10}\)\s)+
```

## Disclaimer
The ISBN-13 codes listed might not correspond to the latest version of the *learning reference* available.
