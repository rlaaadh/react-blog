/* eslint-disable */
import { useState } from 'react';
import './App.css';

function App() {
  const user = '다혜';
  const [contents, setContents] = useState([
    {
      title: '안녕, 2024년',
      likeNum: 123,
      date: '2023.01.01',
      detail: '벌써  내가 28이라니 😥😥😥',
    },
    {
      title: '취업 준비',
      likeNum: 5,
      date: '2023.01.01',
      detail: '취업 준비 열심히 하자',
    },
    {
      title: '재미있는 드라마',
      likeNum: 0,
      date: '2023.01.01',
      detail: '요새 재미있는 콘텐츠 찾아보는 것이 낙이다 👍',
    },
    {
      title: '동창회',
      likeNum: 0,
      date: '2023.01.01',
      detail: '올해는 동창회를 나가야지 🖊️',
    },
  ])
  const [modal, setModal] = useState(false);
  const [itemNum, setItemNum] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [textValue, setTextValue] = useState('');

  return (
    <div className="App">
      <header className="header">
        <h1 >Blog</h1>
      </header>

      <div className="contents">
        <div className="contents__top">
          <h2 className="theme">'{user}'님의 Notes</h2>
        </div>

        <div className="contents__buttons">
          <button className="ui-button ui-button--basic" onClick={()=>{
              const copy = [...contents];
              copy.sort((a, b) => a.title.localeCompare(b.title));
              setContents(copy);
              }}>오름차순</button>

            <button className="ui-button ui-button--basic" onClick={()=>{
              const copy = [...contents];
              copy.sort((a, b) => a.title.localeCompare(b.title)).reverse();
              setContents(copy);
              }}>내림차순</button>
        </div>

        <div className="list">
          {contents.map(function(a, i){
            return(
              <div className="list__item" key={i}>
                <div className="list__block">
                  <h2 className="list__title" onClick={()=>{setModal(true); setItemNum(i)}}>{a.title}</h2>
                  <div className="list__like" onClick={()=>{
                      const numCopy = [...contents];
                      numCopy[i].likeNum = numCopy[i].likeNum + 1;
                      setContents(numCopy)
                    }}>
                      <span className="list__emoji">🧡</span><span className="list__num">{contents[i].likeNum}</span>
                  </div>
                  <button className="list__trash" onClick={()=>{
                    console.log(i);
                    const copy = [...contents];
                    copy.splice(i, 1);
                    setContents(copy);
                  }}>
                    <span className="list__icon">🗑️</span>
                    <span className="blind">삭제하기</span>
                </button>
                </div>
                <div className="list__date">{contents[i].date}</div>
              </div>
              )
            }
          )
        }
        </div>

        <div className="no-data">
          <div className="no-data__title">게시글이 없습니다.</div>
        </div>

        {modal ? <Modal contents={contents} itemNum={itemNum} setModal={setModal}/>: null}

        <div className='contents__footer'>
          <div className="ui-input">
            <label className="ui-input__label" for="title">제목</label>
            <input type="text" className="ui-input__input" onChange={(e)=>{setInputValue(e.target.value);}} id="title"/>
          </div>

          <div className="ui-textarea">
            <textarea rows="10" className="ui-textarea__contents" onChange={(e)=>{setTextValue(e.target.value);}}></textarea>
          </div>

          <button className="ui-button ui-button--register" onClick={()=>{
              const copy = [...contents];
              const year = new Date().getFullYear();
              const month = ("0" + (new Date().getMonth() + 1)).slice(-2);
              const date = ("0" + (new Date().getDate())).slice(-2);
              const printDate = year + '.' + month + '.' + date

              copy.unshift({title: inputValue, likeNum: 0, date: printDate, detail: textValue})
              setContents(copy);
            }}>등록하기</button>
        </div>
      </div>
    </div>
  );
}

function Modal(props){
  return(
    <div className="modal">
      <div className="modal__inner">
        <h3 className="modal__title">{[props.contents[props.itemNum].title]}</h3>
        <p className="modal__date">작성일 : {[props.contents[props.itemNum].date]}</p>
        <p className="modal__detail">{[props.contents[props.itemNum].detail]}</p>
        <button className="ui-button ui-button--close" onClick={()=>{props.setModal(false)}} >닫기</button>
      </div>
    </div>
  )
}

export default App;
