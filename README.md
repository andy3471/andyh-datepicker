# AndyH-DatePicker

This is a simple Date Picker component written in Vue JS.

![ScreenShot](https://raw.github.com/andy3471/andyh-datepicker/master/docs/img/datepicker-default.jpg)

## Install

Install with NPM with:

    npm install andyh-datepicker

Import the component into your Vue App:

    import AndyHDatePicker from 'andyh-datepicker'
    ...

    export default {
        ...
        components: {
            'date-picker': AndyHDatePicker
        }
    }

Use the Component with:

    <date-picker></date-picker>

## Data Binding

You can use the Date Picker with V-model to your own data

    <date-picker v-model="datevalue"></date-picker>

## Setting the accent color

    <date-picker v-model="datevalue" :color="#fec107"></date-picker>
