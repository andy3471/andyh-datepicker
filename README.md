# AndyH-DatePicker

This is a simple Date Picker component written in Vue JS.

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
