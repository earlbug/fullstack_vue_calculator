<template>
    <div id="container">
        <div id="calcDiv">
            <div>
                <input v-model="displayText" disabled="true" id="display"></input>
            </div>
            <div id="calcButtons">
                <button
                v-for="btn in buttons"
                :key="btn.text"
                v-on:click="addSymbol(btn.text)"
                v-bind:id="'btn' + btn.text"
                v-bind:disabled="isDisabled(btn.text)"
                class="calcBtn"

                > {{ btn.text }}</button>
            </div>
        </div>

        <div id="historyDiv">
            <h1>Historic calculations:</h1>
            <div id="hist" v-for="(entry, index) in equationList">
                {{ entry }} = {{ resultList[index] }}
            </div>


        </div>
    </div>
</template>


<script setup lang="js">
import { ref } from 'vue';

    const equationList = ref(["streng", "streng"]);
    const resultList = ref(["result", "res"]);

    const displayText = ref('');
    // Decides if the btn should be disabled
    // based on what is on the display
    function isDisabled(btnText) {
        const lastChar = displayText.value.slice(-1);
        if (btnText === "c") {
            return false;
        }
        else if (letters.includes(lastChar)) {
            return true;
        }
        else if (operators.includes(btnText)) {
            if (illegalEndings.includes(lastChar)) {
                return true;
            }
        }
        else if (btnText === "-") {
            return illegalNegatives.includes(lastChar)
        }
        else if (btnText === ".") {
            // Split the expression by the operators and
            // disable if the last part contains a comma.
            const latestPart = displayText.value.split(/[+\-*/]/).pop();
            if (latestPart === undefined) {
                return true;
            }
            else {
                // Check if last char is illegal
                // or last part contains comma
                return (latestPart.includes(".") || illegalEndings.includes(lastChar));
            }
        }
        else if (btnText === "=") {
            return (illegalEndings.includes(lastChar));
        }
        else return false;
    }

    function addSymbol(symbol) {
        if ("c" === symbol) {
            displayText.value = "";
        }
        else if ("=" === symbol) {
            try {
                const equation = displayText.value;
                const result = eval(equation);
                if (result === Infinity) {
                    throw new Error('Division by zero');
                }
                if (result === -Infinity) {
                    throw new Error('Division by zero');
                }
                if (result === "NaN") {
                    throw new Error('Not a Number');
                }
                equationList.value.push(equation);
                resultList.value.push(String(result));
                displayText.value = "";
                displayText.value = String(result);
            } catch {
                displayText.value = 'Error';
            }

        }
        else {
            displayText.value += symbol
        }

    }

    const operators = ["+", "*", "/"];
    const illegalEndings = ["+", "-", "*", "/", ".", "", "r"];
    const illegalNegatives = [".", "-"];
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


    const buttons = [
    { text: '7'},
    { text: '8'},
    { text: '9'},
    { text: '/'},

    { text: '4'},
    { text: '5'},
    { text: '6'},
    { text: '*'},

    { text: '1'},
    { text: '2'},
    { text: '3'},
    { text: '-'},

    { text: '0'},
    { text: '.'},
    { text: '+'},
    { text: '='},

    { text: 'c'},

    ]


</script>

<style scoped>

    @media (min-width: 300px) {
        #container {
            grid-template-areas: "calcDiv historyDiv";

        }
    }

    @media (max-width: 300px) {
        #container {
            grid-template-areas:
                "calcDiv"
                "historyDiv"
            ;
        }
    }

    #container {
            display: grid;
        }

    #display {
        height: 50px;
    }

    #calcDiv, #historyDiv {
        min-width: 300px;
        max-width: 400px;
        background-color: lightgray;
        height: 500px;

    }

    #calcDiv {
        display: grid;
        justify-content: center;
        margin: 40px;
        border-radius: 10px;
    }

    #calcText {
        color: black;
        font-weight: 900;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
    }

    #calcButtons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

    .calcBtn {
        background-color: white;
        color: black;
        font-weight: 900;
        font-size: large;
    }

    #btnc {
        background-color: orange;
    }

    #historyDiv {
        overflow-y: scroll;
        padding: 10px
    }

</style>
