<template>
  <div class="andyh-datepicker-container">
    <div class="date-title">
      <h4 id="date" class="text-center">{{ this.selectedDateTitle }}</h4>
    </div>

    <div class="ah-btn text-center arrow-button" v-on:click="changeYear(-1)">⟵</div>
    <div class="text-center date-title-small">{{ this.selectedYear }}</div>
    <div class="ah-btn text-center arrow-button" v-on:click="changeYear(1)">⟶</div>
    <div class="ah-btn text-center arrow-button" v-on:click="changeMonth(-1)">⟵</div>
    <div class="text-center date-title-small">{{ this.selectedMonthName }}</div>
    <div class="ah-btn text-center arrow-button" v-on:click="changeMonth(+1)">⟶</div>

    <div
      class="date ah-btn text-center day"
      v-for="day in daysHeader"
      v-bind:Key="day.day"
      v-on:click="setDate(day.date)"
    >{{ day.dayName }}</div>
    <div
      v-for="(date, index) in datesThisMonth"
      v-bind:key="index"
      v-on:click="changeDate(date.date, date.month)"
      class="date ah-btn text-center"
      v-bind:class="{
        selected: date.date == selectedDay,
        disabled: date.month !== 0
      }"
    >{{ date.date }}</div>
    <div class="ah-btn text-center arrow-button" v-on:click="setYesterday()">Yesterday</div>
    <div class="ah-btn text-center date-title-small" v-on:click="setToday()">Today</div>
    <div class="ah-btn text-center arrow-button" v-on:click="setTomorrow()">Tomorrow</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      type: Date,
      default: new Date()
    }
  },
  data() {
    return {
      selectedDate: this.value,
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datesThisMonth: [],
      today: new Date(),
      dayToday: new Date().getDay(),
      dateToday: new Date().getDate(),
      daysHeader: []
    };
  },
  computed: {
    selectedDay: function() {
      return this.selectedDate.getDate();
    },
    selectedYear: function() {
      return this.selectedDate.getFullYear();
    },
    selectedMonth: function() {
      return this.selectedDate.getMonth();
    },
    selectedMonthName: function() {
      return this.months[this.selectedMonth];
    },
    selectedMonthYear: function() {
      return (
        this.selectedDate.getMonth() + " " + this.selectedDate.getFullYear()
      );
    },
    selectedDateTitle: function() {
      return (
        this.selectedDay +
        " " +
        this.selectedMonthName +
        " " +
        this.selectedYear
      );
    },
    daysThisMonth: function() {
      return new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth() + 1,
        0
      ).getDate();
    },
    daysLastMonth: function() {
      return new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth(),
        0
      ).getDate();
    },
    thisMonthStartDay: function() {
      return new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth(),
        "1"
      ).getDay();
    }
  },
  mounted() {
    this.calculateMonth();
    this.calculateHeaders();
  },
  methods: {
    setDate(d) {
      this.selectedDate = d;
    },
    changeMonth(incrBy) {
      var d = new Date();
      d.setFullYear(this.selectedDate.getFullYear());
      d.setDate(this.selectedDate.getDate());
      d.setMonth(this.selectedDate.getMonth() + incrBy);
      this.selectedDate = d;
    },
    changeYear(incrBy) {
      var d = new Date();
      d.setFullYear(this.selectedDate.getFullYear() + incrBy);
      d.setDate(this.selectedDate.getDate());
      d.setMonth(this.selectedDate.getMonth());
      this.selectedDate = d;
    },
    changeDate(date, month) {
      var d = new Date();
      d.setFullYear(this.selectedDate.getFullYear());
      d.setMonth(this.selectedDate.getMonth() + month);
      d.setDate(date);
      this.selectedDate = d;
    },
    setToday: function() {
      this.selectedDate = new Date();
    },
    setYesterday: function() {
      var d = new Date();
      d.setDate(d.getDate() - 1);
      this.selectedDate = d;
    },
    setTomorrow: function() {
      var d = new Date();
      d.setDate(d.getDate() + 1);
      this.selectedDate = d;
    },
    calculateHeaders: function() {
      this.daysHeader = [];
      var d = new Date();

      for (let i = this.dayToday; i > 0; i--) {
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
        this.daysHeader.unshift({
          day: i - 1,
          date: d,
          dayName: this.days[i - 1]
        });
      }
      d = new Date();
      for (let i = this.dayToday; i < 7; i++) {
        this.daysHeader.push({
          day: i,
          date: d,
          dayName: this.days[i]
        });
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
      }
    },

    calculateMonth: function() {
      this.datesThisMonth = [];
      var d = this.daysLastMonth;

      for (let i = 0; i < this.thisMonthStartDay; i++) {
        this.datesThisMonth.unshift({
          date: d,
          month: -1
        });
        d--;
      }
      for (let i = 0; i < this.daysThisMonth; i++) {
        this.datesThisMonth.push({
          date: i + 1,
          month: 0
        });
      }
      d = 1;

      for (let i = this.datesThisMonth.length; i % 7 !== 0; i++) {
        this.datesThisMonth.push({
          date: d,
          month: +1
        });
        d++;
      }
    }
  },
  watch: {
    selectedDate: function() {
      this.$emit("input", this.selectedDate);
    },
    selectedMonthYear: function() {
      this.calculateMonth();
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

.andyh-datepicker-container {
  display: grid;
  border: 1px solid #dee2e6;
  grid-template-columns: auto auto auto auto auto auto auto;
  text-align: center;
  font-family: "Roboto", sans-serif;
  background: white;
}

.date-title {
  grid-column: 1/8;
  padding: 0.75rem;
  color: #212529;
}

.arrow-button {
  grid-column: span 2;
  border-top: 1px solid #dee2e6;
  padding: 0.75rem;
  font-weight: bold;
  color: #212529;
}

.date-title-small {
  grid-column: span 3;
  border-top: 1px solid #dee2e6;
  padding: 0.75rem;
  font-weight: bold;
  color: #212529;
}

.day {
  font-weight: bold;
}

.ah-btn {
  cursor: pointer;
}

.ah-btn:hover {
  background: #f2f2f2;
}

.date {
  border-top: 1px solid #dee2e6;
  color: #212529;
  padding: 0.75rem;
}

.selected {
  background-color: #f27405;
}

.disabled {
  color: #888888;
  background-color: white;
}
</style>
