import { useEffect, useState } from 'react';

const Todo = () => {

    const getLocalData = () => {
        const lists = localStorage.getItem('myTodoList');

        if(lists) {
            return JSON.parse(lists);
        } else {
            return [];
        }
    }

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalData());

    const addItem = () => {
        if (!inputData) {
            alert('Please Add Item First');
        } else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, myNewInputData])
            setInputData('')
        }
    }

    // individual item delete 
    const deleteItem = (id) => {
        const updatedItems = items.filter((currElem) => {
            return currElem.id !== id
        });
        setItems(updatedItems);
    }

    // Adding Local Storage 
    useEffect(() => {
           localStorage.setItem('myTodoList', JSON.stringify(items));
    },[items])

    return (
        <>
            <div className='container'>
                <div className='new-item-form'>
                    <div className='form-row'>
                        <label>New Item</label>
                        <input
                            placeholder='Add Items'
                            type='text'
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />
                    </div>
                    <button className='btn' onClick={addItem}>Add</button>
                </div>

                {/* Show our added items here */}
                <div className='showItems'>
                    <h1 className='header'>Todo List 📝</h1>
                    {
                        items.map((currElem) => {
                            return (
                                <div className='eachItem' key={currElem.id}>
                                    <ul className='list'>
                                        <li>
                                            <label>
                                                <input type='checkbox' />
                                                {currElem.name}
                                            </label>
                                            <button className='btn btn-danger' onClick={() => deleteItem(currElem.id)}>Delete</button>
                                        </li>
                                    </ul>
                                </div>
                            );
                        })
                    }

                </div>
            </div>
        </>

    );
}

export default Todo;
