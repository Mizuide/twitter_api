import React, { useState,useEffect, useContext } from "react";
import Button from "./Button_hooks"


const InputZone = () => {

    
    const [userId, setUserId] = useState(0);
    const [sortRule,setSortRule]= useState("rt");
    return (
        <div>
            ユーザID<input type="text" onChange={e =>setUserId(e.target.value)} size="10" ></input>のツイートを
            <div>
                <input type="radio" name="sort" value="rt" onChange={ e =>  setSortRule(e.target.value)} checked="checked" />RT数順
                <input type="radio" name="sort" value="fav" onChange={ e =>  setSortRule(e.target.value)} />お気に入り数順
            </div>
                に並べる
               <Button userId={userId} sortRule={sortRule} />
           </div>
    );
};

export default InputZone;