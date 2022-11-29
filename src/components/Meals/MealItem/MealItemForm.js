import {useRef, useState} from "react";
import classes from './MealItemForm.module.css';
import Input from "../../UI/Input";

//when we have to evaluate js obj we use two curly braces --> {{}}
//the props in the <Input/> are default props that can be added to any Input element

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);

    //ref same as 2 way binding--> refs received in the Input component
    const amountInputRef = useRef();

    const submitHandler = e => {
        e.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim().length === 0
            || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    };

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input ref={amountInputRef}
               label='Amount'
               input={{
                   id: 'amount_' + props.id,
                   type: 'number',
                   min: '1',
                   max: '5',
                   step: '1',
                   defaultValue: '1'
               }}/>
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount 1-5</p>}
    </form>
}

export default MealItemForm;