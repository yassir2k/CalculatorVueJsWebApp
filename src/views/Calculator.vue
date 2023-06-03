<template>
  <div id="app">
    <br /><br /><br /><br /><br /><br />
    <div class="row">
      <div class="col-sm-4">

      </div>
      <div class="col-sm-4">
        <form>
        <fieldset class="border p-2">
          <legend class="float-none w-auto p-2 fw-bold" style="text-align: left;">Toggle to Restyle Look and Feel</legend>
          <div v-if="restyle_switch">
          <div class="switch">
              <label>
                  <label class="fw-bold">OFF</label>
                  <input type="checkbox" :value="restyle_switch" checked="checked" @change="ToggleLookAndFeel()">
                  <span class="lever"></span><label class="fw-bold text-success">ON</label>
              </label>
          </div>
        </div>
        <div v-else>
          <div class="switch">
              <label>
                  <label class="fw-bold text-danger">OFF</label>
                  <input type="checkbox" :value="restyle_switch" @change="ToggleLookAndFeel()">
                  <span class="lever"></span><label class="fw-bold">ON</label>
              </label>
          </div>
        </div>
        </fieldset>
        </form>
      </div>
      <div class="col-sm-4">

      </div>
    </div>

    <br />
    <!-- Second Row -->
    <div class="row">
      <div class="col-sm-4">
      </div>

      <div class="col-sm-4">
        <div class="form-group">
          <div class="d-grid gap-2">
            <button type="submit"  class="btn shadow p-3 btn-success btn-lg"   @click="StartCalculator()" >
                Start Calculator <font-awesome-icon :icon="['fas', 'calculator']" beat style="color: #ffffff;" />
            </button> 
          </div>
        </div>
      </div>

      <div class="col-sm-4">
      </div>
    </div>

    <!-- The Modal1 begins Here, Gets triggered when the look and feel swtich is turned on -->
    <div id="LoadingModal" ref="Modal1" class="modal fade" > 
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header text-bg-danger">		
            <img src="@/assets/gl-logo-white.png" width="50" height="49" />			
              <h4 class="modal-title">GL Assessment Modal Calculator</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" @click="HandleModalClosure()"></button>
          </div>
          <div class="modal-body shadow p3"> 		
						<!-- Here The Design of the Calculator takes place -->
            <center>
              <div class="CalculatorLayout">
                <div class="CalculatorScreen">{{screen || 0}}</div>
                <div @click="Append('7')" class="CalculatorButton">7</div>
                <div @click="Append('8')" class="CalculatorButton">8</div>
                <div @click="Append('9')" class="CalculatorButton">9</div>
                <div class="CalculatorButton CalculatorOperands" @click="OperatorClicked('+')">+</div>
                <div @click="Append('4')" class="CalculatorButton">4</div>
                <div @click="Append('5')" class="CalculatorButton">5</div>
                <div @click="Append('6')" class="CalculatorButton">6</div>
                <div class="CalculatorButton CalculatorOperands" @click="OperatorClicked('-')">-</div>
                <div @click="Append('1')" class="CalculatorButton">1</div>
                <div @click="Append('2')" class="CalculatorButton">2</div>
                <div @click="Append('3')" class="CalculatorButton">3</div>
                <div @click="EqualClicked()" class="CalculatorButton CalculatorOperands CenterEqualTo">=</div>
                <div @click="Append('0')"  class="CalculatorButton CenterZero">0</div>
                <div class="CalculatorButton CalculatorOperands" @click="Clear()">C</div>
              </div>
            </center>
            <!-- End of Calculator Design -->
					</div>
					<div class="modal-footer text-bg-secondary">
						&copy; 2023 Designed by Yassir Yahaya
					</div>
        </div>
      </div>
    </div>

    <!-- The Modal2 begins Here, Gets triggered when the look and feel swtich is turned off -->
    <div id="LoadingModal" ref="Modal2" class="modal fade" > 
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header text-bg-danger">		
            GL Assessment Modal Calculator
              <button type="button" class="btn-close" data-bs-dismiss="modal" @click="HandleModalClosure()"></button>
          </div>
          <div class="modal-body"> 		
						<!-- Here The Design of the Calculator takes place -->
            <center>
              <div class="CalculatorLayout">
                <div class="CalculatorScreen2">{{screen || 0}}</div>
                <div @click="Append('7')" >7</div>
                <div @click="Append('8')" >8</div>
                <div @click="Append('9')" >9</div>
                <div @click="OperatorClicked('+')">+</div>
                <div @click="Append('4')" >4</div>
                <div @click="Append('5')" >5</div>
                <div @click="Append('6')" >6</div>
                <div @click="OperatorClicked('-')">-</div>
                <div @click="Append('1')" >1</div>
                <div @click="Append('2')" >2</div>
                <div @click="Append('3')" >3</div>
                <div @click="EqualClicked()" class=" CenterEqualTo">=</div>
                <div @click="Append('0')" class="CenterZero" >0</div>
                <div @click="Clear()">C</div>
              </div>
            </center>
            <!-- End of Calculator Design -->
					</div>
					<div class="modal-footer text-dark">
						&copy; 2023 Designed by Yassir Yahaya
					</div>
        </div>
      </div>
    </div>
    <!-- End of Modals -->
  </div>
</template>


<script>
import axios from 'axios';
export default {
    name: 'app',
    data() {
        return{
            header: "GL Assessment Modal Calculator",
            csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            restyle_switch: false, //A boolean variable for storing the value of look and feel switch
            num_1: null, //Number entered before operator is clicked
            num_2: null, //Number entered after operator is clicked
            operator: null, //Stores the value of the operand clicked
            result: '', //For calculating result
            screen: '', //Serves as calculator screen
            operatorSet: false, //Checks whether operator (+ or -) was clicked or not
            operationDone: false, //Checking if the equal sign is clicked
        }
    },
    methods:{
      StartCalculator(){ //Gets triggered when the green button is clicked to start the calculator
            let element = null
            if(this.restyle_switch)
              element = this.$refs.Modal1;
            else
              element = this.$refs.Modal2;
            $(element).modal('show');
      },
      ToggleLookAndFeel(){ //This get called when the switch is toggled
        this.restyle_switch = !(this.restyle_switch);
      },
      HandleModalClosure(){ //Gets triggered when the modal is closed
        this.Clear();
      },
      Clear(){ //Triggered when C is clicked
        this.screen = '';
        this.operatorSet = false;
        this.operator = '';
        this.num_1 = this.num_2 = null;
        this.operationDone = false;
      },
      Append(number){ //Appends number(s) to the screen
        if(this.operationDone == true) //If = was the last clicked, we want the calculator screen to clear afresh
          this.Clear();
        if(number == 0) //This conditional statement prevents zero(s) as starting number(s)
        {
          if(this.screen.length == 0)
            return;
        }
        this.screen = `${this.screen}${number}`;
        if(this.operatorSet){
          //This string operations helps to store the value of the number on the right hand of the operand in the
          //variable num_2. We would later convert this number to integer for our calculation
          this.num_2 = this.screen.slice(this.screen.indexOf(this.operator)+1, this.screen.length);
        }
      },
      OperatorClicked(operator){ //Function handles what happens when + or - is clicked.
        if(this.operatorSet){
          alert("This is a simple calculator. One operator at a time please.");
        }
        else if(this.screen.length == 0){
          alert("Operator has to come after a number.");
        }
        else{
          this.operator = operator;
          this.operatorSet = true;
          this.num_1 = this.screen;
          this.screen = this.screen + operator;
        }
      },
      EqualClicked(){ //Gets triggered when the = button is clicked
        if(this.num_1 == null || this.num_2 == null || this.operator == null){
          alert("Please enter two numbers separated by an operand before clicking '=' ");
        }
        else{
          const config = {
              headers : { //To address CORS issues from the requester
                'Content-type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
              }
            };
          this.num_1 = parseInt(this.num_1); //Casting to Integer to avoid int type mismatch during addition/subtraction
          this.num_2 = parseInt(this.num_2); //Casting to Integer to avoid int type mismatch during addition/subtraction
          if(this.operator == '+'){
            let url = "https://localhost:7041/api/addnumbers/"+`${this.num_1}/${this.num_2}`;
              try{
                  axios.get(url, config)
                  .then(response =>{
                      this.screen = this.screen + '=' + response.data; //Display ' = Result'
                  });
              }
              catch(err){    
                  if (err.response) {
                  // client received an error response (5xx, 4xx)
                  console.log("Add Server Error:", err)
                  } else if (err.request) {
                  // client never received a response, or request never left
                  console.log("Add Network Error:", err)
                  } else {
                  console.log("Add Client Error:", err)
                  }
              }
          }
          else{ //Subtraction Operation
            let url = "https://localhost:7041/api/subnumbers/"+`${this.num_1}/${this.num_2}`;
             try{
                  axios.get(url, config)
                  .then(response =>{
                      this.screen = this.screen + '=' + response.data //Display ' = Result'
                  });
              }
              catch(err){    
                  if (err.response) {
                  // client received an error response (5xx, 4xx)
                  console.log("Add Server Error:", err)
                  } else if (err.request) {
                  // client never received a response, or request never left
                  console.log("Add Network Error:", err)
                  } else {
                  console.log("Add Client Error:", err)
                  }
              }
          }
        }
        this.operationDone = true; //This flag would be used to erase the screen to start afresh after clicking on =
      }
    }
  }
</script>

<style scoped>
.CalculatorLayout{ /* Grid layout of the calculator */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
  font-size: xx-large;
  font-weight: bold;
  margin: 0 auto;
  width: 300px;
}
.CalculatorScreen{ /* Screen color and layout of the calculator's screen (look and feel ON)*/
  background-color: rgb(199, 224, 245);
  grid-column: 1/5;
}

.CalculatorScreen2{ /* Screen color and layout of the calculator's screen (look and feel OFF)*/
  border: 1px solid #999999;
  grid-column: 1/5;
}

.CenterZero{ /*Makes 0 in the middle */
  grid-column: 1/4;
}

.CalculatorButton{ /* Button css for calculator when switch is ON */
  background-color: #DDDDDD;
  color: maroon;
  border: 1px solid #444444;
}

.CalculatorOperands{ /*CSS for the symbols/operators */
  background-color: goldenrod;
  color: whitesmoke
}
</style>