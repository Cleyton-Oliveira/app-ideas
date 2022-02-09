//View
const input = document.getElementById("input");
input.addEventListener("keyup", lastDigitIsValid);

const modes = document.getElementsByName("convertionMode");
modes.forEach((mode)=>{
    mode.addEventListener("click", changeConvertionMode);
})
document.getElementById("submit-button").addEventListener("click", convert);

const display = document.getElementById("display");
//Logic

function changeConvertionMode(){
    input.value = "";
}
function lastDigitIsValid(){
    const digit = parseInt(input.value[input.value.length-1]);
    console.log(digit);
    let mode = getCurrentConvertionMode();

    if(isNaN(digit) || (mode == "binary" && digit > 1)){
        console.log("here");
        input.value = input.value.slice(0,parseInt(input.value.length-1));
    }    
}
function getCurrentConvertionMode(){
    for(let i = 0; i< modes.length; i++){
        if(modes[i].checked)
            return modes[i].value;
    }
    return null;
}
function inputController(event){
    const currentMode = getCurrentConvertionMode();
        
}
function convert(){
    let converter = getCurrentConvertionMode() == "binary"? createConverterBin2Dec() : createConverterDec2Bin();
    
    display.textContent = converter.convert(input.value);    
}

function createConverterBin2Dec(){
    function convert(sequence){
        let convertionResult = 0;
        for(let i = 0; i < sequence.length; i++)
            convertionResult += parseInt(sequence[i]) * 2**((sequence.length-1-i))
        
        return convertionResult;
    }

    return {
        convert,
    }
}
function createConverterDec2Bin(){
    function convert(sequence){
        let value = parseInt(sequence);
        let convertionResult = "";
        while(value > 1){
            convertionResult = value % 2 + convertionResult;
            value = Math.floor(value/ 2);
            console.log(convertionResult);
        }
        if(value)
            convertionResult = value % 2 + convertionResult;
        
        return convertionResult;
    }

    return {
        convert,
    }
}