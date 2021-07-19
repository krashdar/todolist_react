import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {checked: false};
        this.setCheck = this.setCheck.bind(this);
    }

    setCheck() {
        this.setState(prevState => ({
            checked: !prevState.checked
        }));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.checked === false) {
            completedItems.push(this);
            alert(`Вы изменили задачу "${this.props.value.content}", ${new Date().toString()}`);
            console.log(completedItems);
            console.log(completedItems.length);
        } else {
            let indexof = completedItems.indexOf(this);
            if (indexof !== -1) {
                completedItems.splice(indexof, 1);
                alert(`Вы изменили задачу "${this.props.value}", ${new Date().toString()}`);
                console.log(completedItems);
                console.log(completedItems.length);
            }
        }
    }

    render() {
        return (
            <li>
                <input id={`delo${this.props.value.id}`} type={"checkbox"} onClick={(e) => {
                    this.setCheck();
                }
                }/>
                <label For={`delo${this.props.value.id}`}
                       className={this.state.checked ? "checked" : ""}>{this.props.value.content}</label>
            </li>
        );
    }
}

class Button extends React.Component {
    render() {
        return (
            <button onClick={(e) => {
                let completedItemsList = "Список выполненных задач: \n";
                for (let item of completedItems) {
                    completedItemsList += item.props.value.content + "\n";
                }
                alert(completedItemsList);
            }}>
                Показать список выполненных задач
            </button>
        )
    }
}

function List(props) {
    const listItems = props.items.map((item) =>
        <Item key={item.id.toString()}
              value={item}/>
    )
    return (
        <div className={"result"}>
            <ul>
                {listItems}
            </ul>
            <Button/>
        </div>
    )
}
let completedItems = [];
const items = [
    {id: 1, content: "Сделать todolist"},
    {id: 2, content: "Сделать тестовое в Ситимобил"},
    {id: 3, content: "Сделать тестовое для Future"},
    {id: 4, content: "Откликнуться еще на 10 вакансий"}
];
ReactDOM.render(
    <List items={items}/>,
    document.getElementById("root")
)
