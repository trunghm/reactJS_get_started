
const MemoryClear = (props) => {
  return (
      <span> MC </span>
  );
};

const MemoryRecall = (props) => {
  return (
      <span> MR </span>
  );
};

const MemoryPlus = (props) => {
  return (
      <span> M+ </span>
  );
};

const MemoryMinus = (props) => {
  return (
      <span> M- </span>
  );
};

const Display = (props) => {
  let number;
  if (props.clearedEntry)
    number = '0';
  else{
    if (props.result === '0' || props.selectedNumber !== '0'){
      number = props.selectedNumber;
    }
    else{
      number = props.result;
    }
  }
  return (
    <div className="col-4 text-center">
      <h4 className="expression">{props.expression}</h4>
      <input type="text" placeholder="0" value={number}/>
    </div>
  );
};

const ClearEntry = (props) => {
  return (
      <span onClick={props.clearEntry}> CE </span>
  );
};

const AllClear = (props) => {
  return (
      <span onClick={props.resetCalculator}> AC </span>
  );
};

const Back = (props) => {
  return (
      <span onClick={props.deleteNumber}> &larr; </span>
  );
};

const Cal = (props) => {
  return (
      <span onClick={props.equal}> = </span>
  );
};

const NumberKeys = (props) => {
  return (
    <div>
      {NumberKeys.list.map((number, i) =>
        <span key={i}
              onClick={() => props.selectNumber(number)}>
          {number}
        </span>
      )}
      <span onClick={props.selectDecimal}>.</span>
    </div>
  );
};

NumberKeys.list = new Array(7,8,9,4,5,6,1,2,3,0);

const Operators = (props) => {
  return (
    <div>
      <span onClick={() => props.selectOperator('+')}> + </span>
      <span onClick={() => props.selectOperator('-')}> - </span>
      <span onClick={() => props.selectOperator('*')}> * </span>
      <span onClick={() => props.selectOperator('/')}> / </span>
    </div>
  );
};

class Calculator extends React.Component {
  static initialState = () => ({
    selectedNumber: '0',
    selectedOperator: null,
    result:'0', 
    clearedEntry: null,
    expression:''
  });
  
  state = Calculator.initialState();
  resetCalculator = () => this.setState(Calculator.initialState());
  
  selectNumber = (number) => {
    this.setState(prevState => {  
      let selectedNumber;
      if (prevState.selectedNumber === '0'){
        selectedNumber = number.toString();
      }
      else{
        selectedNumber = prevState.selectedNumber + number.toString();
      }
      return {
          selectedNumber: selectedNumber,
          clearedEntry:null,
      };        
    }); 
  };
  
  equal = () => {
    this.setState(prevState => {
      let tempResult = prevState.result === '0' ? 
            prevState.selectedNumber : 
            this.calculate(prevState).toString();
            
       return {
          result: tempResult,
          selectedNumber: '0',
          selectedOperator: null,
          clearedEntry:null,
          expression:''
        }     
    })
  };
  
  calculate = (state) => {
    let tempResult;
    if (!state.selectedOperator)
      return Number(state.result);
      
    if (state.result !== '0' && state.selectedNumber != '0' && state.selectedOperator){
      switch (state.selectedOperator)
      {
        case '+': 
          tempResult = Number(state.result) + Number(state.selectedNumber);
        break;
        case '-':
          tempResult = Number(state.result) - Number(state.selectedNumber);
        break;
        case '*':
          tempResult = Number(state.result) * Number(state.selectedNumber);
        break;
        case '/':
          tempResult = Number(state.result) / Number(state.selectedNumber);
        break;
        default:
          tempResult = Number(state.result);
        break;
      }
    }
    
    return tempResult; 
  }
  
  selectOperator = (operator) => {
      this.setState(prevState => {
        return {
          result: prevState.result === '0' ? 
            prevState.selectedNumber : 
            this.calculate(prevState).toString(),
          selectedNumber: '0',
          selectedOperator: operator,
          clearedEntry: null,
          expression:prevState.expression.concat(prevState.selectedNumber, operator)
        }
    });
  };

  selectDecimal = () => {
    this.setState(prevState => ({
      selectedNumber: prevState.selectedNumber + '.',
      clearedEntry: null
    }));
  };
  
  clearEntry =() => {
    this.setState(prevState => ({
      selectedNumber: '0',
      clearedEntry : true
    }))
  };
  
  deleteNumber = (props) => {
    this.setState(prevState => {
      if (prevState.selectedNumber !== '0'){
        return {
          selectedNumber: prevState.selectedNumber.substring(0, prevState.selectedNumber.length - 1)
        }
      }
    })
  };
  
  render() {
    const {
      selectedNumber,
      decimalPos,
      selectedOperator,
      result,
      clearedEntry,
      expression
    } = this.state;

    return (
      <div className="container">
        <h3>Calculator </h3>
        <hr />
        <div className="row">
          <Display selectedNumber={selectedNumber}
                    result={result}
                    clearedEntry = {clearedEntry}
                    expression={expression}/>
        </div>
        
        <div className="row" >
          <div className="col-3">
            <Back deleteNumber={this.deleteNumber}/>
            <ClearEntry clearEntry={this.clearEntry}/>
            <AllClear resetCalculator={this.resetCalculator}/>
          </div>
          <div className="col-1">
            <Cal equal={this.equal}/>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <NumberKeys selectDecimal={this.selectDecimal}
                        selectNumber={this.selectNumber}/>            
          </div>
          <div className="col-1">
            <Operators selectOperator={this.selectOperator}/>
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Calculator />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);