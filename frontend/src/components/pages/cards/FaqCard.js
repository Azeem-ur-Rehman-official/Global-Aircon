import React, { useState } from 'react';

const FaqCard = (props) => {
  const [expand, setExpand] = useState(true);

  const changeIcon = () => {
    if(expand) return setExpand(false);
    return setExpand(true);
  }

  let arr = props.answer.split('\n');

  return (
    <li>
      <a data-toggle="collapse" className="collapsed" href={"#faq" + props._id} onClick={changeIcon}>
        {props.question} <i className={expand ? "fa fa-plus" : "fa fa-minus"}></i>
      </a>
      <div id={"faq" + props._id} className="collapse" data-parent="#faq-list">
        <ul className="list-group">{
            arr.map(element => {
              return <li className="list-group-item">
                {element}
              </li>
            })
          }
        </ul>
      </div>
    </li>
  );
};

export default FaqCard;
