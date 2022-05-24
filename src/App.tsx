import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { NotifyInf, Task, UTask } from './model';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators, State } from './state';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const dispatch = useDispatch();

  const { addTask, removeTask, updateTask } = bindActionCreators(actionCreators, dispatch);
  const tas = useSelector((state: State) => state.task)
  const tas2 = JSON.parse(JSON.stringify(tas))
  const tas3 = [...tas2];


  const [task, setTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');
  const [taskDuration, setTaskDuration] = useState('');
  const [removeTaskId, setRemoveTaskId] = useState<any>('');
  const [updateTaskId, setUpdateTaskId] = useState<any>('');
  const [updateTaskDuration, setUpdateTaskDuration] = useState<string>('');
  let finalArr: Array<Task> = [];
  const [displayTasks, setDisplayTasks] = useState<any>([])
  const [notifyInd, setNotifyInd] = useState<number>(0)
  const [notifyCompareNum, setNotifyCompareNum] = useState<number>(0)

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isEditable, setIsEditable] = useState<boolean>(false)

  const notify = (msg: string) => {
    toast.info(msg, {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 5000
    });
  }

  const showSnackBar = () => {

    console.log('notifyInd : ', notifyInd, '&&', ' notifyCompareNum : ', notifyCompareNum)
    if (tas2[1] && seconds >= 0) {
      if (isActive && seconds == notifyCompareNum && tas2[1][notifyInd]) {
        notify(tas2[1][notifyInd].name + ' is Starting')
        setNotifyCompareNum(notifyCompareNum + Number(tas2[1][notifyInd].duration))
        setNotifyInd(notifyInd + 1)
      }
    }
  }

  function toggle() {
    setIsActive(!isActive);
  }
  const resetTimer = () => {
    setSeconds(0);
    setNotifyInd(0);
    setNotifyCompareNum(0);
  }

  useEffect(() => {
    let interval: any = null;
    if (seconds === 60) {
      setIsActive(false)
      setSeconds(0)
      clearInterval(interval)
    }
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    showSnackBar()
    return () => clearInterval(interval);
  }, [isActive, seconds, tas3]);


  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let taskData: Task = {
      id: uuidv4(),
      name: taskName,
      duration: taskDuration,
    }
    finalArr.push(taskData);
    finalArr = [...finalArr, taskData];
    addTask(taskData)
    setTasks([...tas2, taskData])
    setTaskDuration('0')
  }
  const deleteTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    removeTask(removeTaskId)
  }

  const callUpdateTask = (task: UTask) => {
    setIsEditable(true)
    setUpdateTaskId(task.id)
    setUpdateTaskDuration(task.duration)
  }

  const updateTaskById = (task: UTask) => {
    updateTask(task)
    setIsEditable(false)
  }

  return (
    <Container className="row">
      <div className='col-md-6'>
        <div>
          <h2>Live Timer</h2>
          <button onClick={() => toggle()}>{isActive ? 'Stop' : 'Start'}</button>
          <button onClick={() => resetTimer()}>Reset</button>
          <span>
            {
              isActive ? <p>Your timer is on</p> : ''
            }
          </span>
        </div>
        <div className='row mt-5'>
          <div className='col-md-2'>
            <div className='row mt-2'>
              {tas3[1] ?
                tas3[1].map((taskToShow: Task) => {
                  return <div className='d-flex flex-column justify-content-center' style={{ height: Number(taskToShow.duration) * 5 + 'px', width: '100%' }}><p>{taskToShow.name}</p></div>
                })
                :
                <div></div>
              }
            </div>
          </div>
          <div className='col-md-7'>
            <div style={{ border: '0.5px solid gray', height: '300px', width: '100%', position: 'relative' }}>
              <div style={{ backgroundColor: "red", height: '1px', width: '100%', position: 'absolute', marginTop: seconds * 5, zIndex: '2' }}></div>

              {tas3[1] ?
                tas3[1].map((taskToShow: Task) => {
                  return <div style={{ backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16), height: Number(taskToShow.duration) * 5 + 'px', width: '100%', zIndex: '2', border:'0.125px solid black' }}></div>
                })
                :
                <div></div>
              }
              <ToastContainer />
            </div>
          </div>
          <div className='col-md-3'>
            <div style={{ position: 'relative' }}>
              <div style={{ zIndex: '2px', marginTop: (seconds * 5) - 9, position: 'absolute', color: 'red', fontSize: '12.5px' }}>
                <p>Current Time</p>
              </div>
            </div>
            <div style={{height:'300px'}}>
              <div style={{height: '50px', marginTop: '38px'}}><p>10 Seconds</p></div>
              <div style={{height: '50px'}}><p>20 Seconds</p></div>
              <div style={{height: '50px'}}><p>30 Seconds</p></div>
              <div style={{height: '50px'}}><p>40 Seconds</p></div>
              <div style={{height: '50px'}}><p>50 Seconds</p></div>
              <div style={{height: '50px'}}><p>60 Seconds</p></div>
            </div>
          </div>
        </div>
        <div>

        </div>
      </div>
      <div className='col-md-6'>
        <div className='row'>
          <h2>Tasks Tables</h2>
          <form onSubmit={submitForm}>
            <input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              type="text"
              placeholder="Enter task name"
              className="input"
            />
            <input
              value={taskDuration}
              onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                setTaskDuration(e.currentTarget.value);
              }}
              type="number"
              placeholder="Enter a duration"
              className="input"
            />
            <button type="submit" className="btn">Add Task</button>
          </form>
        </div>
        <div className='row'>
          <div>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Task Name</th>
                  <th>Task Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  tas2[0] ? tas2[0].map((t: Task) => {
                    return <tr>
                      <td>{t.name}</td>
                      <td>
                        {
                          t.id === updateTaskId && isEditable ?
                            <>
                              <input
                                value={updateTaskDuration}
                                onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                                  setUpdateTaskDuration(e.currentTarget.value);
                                }}
                                type="number"
                                className="input"
                              />
                              <button type='button' onClick={() => updateTaskById({ id: t.id, duration: updateTaskDuration })}>Update</button>
                              <button type='button' onClick={() => setIsEditable(false)}>Cancel</button>
                            </>

                            :
                            t.duration
                        }
                      </td>
                      <td>
                        <button onClick={() => callUpdateTask({ id: t.id, duration: t.duration })}>Edit</button>
                        <button onClick={() => removeTask(t.id)}>Delete</button>
                      </td>
                    </tr>
                  })
                    :
                    <div></div>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </Container>
  );
}

export default App;
