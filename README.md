# Lucca Cleemy trial by Rayane Benbouziyane

---

## Presentation

This application is using the PrimeNG component library.
The package Akita allows data storage and the reactive part has been done with RxJS observables.
Currency conversion is only available from US Dollar with the free versions of the different currency APIs so I created an API that returns currencies and their change rates.
It possible to chose between french and english.
_Note: the calendar component is using the date format mm/dd/yyyy regardless of the selected language_

---

## Getting started

Run expense API

```
npm run expense-api
```

Run currency API

```
npm run currency-api
```

By default, the `ng serve` command starts the application in english. You can start the french version with

```
ng serve --configuration=fr
```
