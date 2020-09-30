import React, { useState, useEffect } from 'react';
import { Timeline } from 'antd';

import '../public/style/components/quotes.css';

const Quotes = () => {

  return (
    <div className="comm-box Quotes-div">
      <div className="Quotes-header"><strong>《如果》</strong></div>
      <div className="Quotes-content">
        <p>如果周围的人毫无理性地向你发难，你仍能镇定自若保持冷静；</p>
        <p>如果众人对你心存猜忌，你仍能自信如常并认为他们的猜忌情有可原；</p>
        <p>如果你肯耐心等待不急不躁，</p>
        <p>或遭人诽谤却不以牙还牙，</p>
        <p>或遭人憎恨却不以恶报恶；</p>
        <p>既不装腔作势，亦不气盛趾高；</p>
        <p>如果你有梦想，而又不为梦主宰；</p>
        <p>如果你有神思，而又不走火入魔；</p>
        <p>如果你坦然面对胜利和灾难，对虚渺的胜负荣辱胸怀旷荡；</p>
        <p>如果你能忍受有这样的无赖，歪曲你的口吐真言蒙骗笨汉，</p>
        <p>或看着心血铸就的事业崩溃，仍能忍辱负重脚踏实地重新攀登；</p>
        <p>如果你敢把取得的一切胜利，为了更崇高的目标孤注一掷，</p>
        <p>面临失去，决心从头再来而绝口不提自己的损失；</p>
        <p>如果人们早已离你而去，你仍能坚守阵地奋力前驱，</p>
        <p>身上已一无所有，唯存意志在高喊“顶住”；</p>
        <p>如果你跟平民交谈而不变谦虚之态，</p>
        <p>亦或与王侯散步而不露谄媚之颜；</p>
        <p>如果敌友都无法对你造成伤害；</p>
        <p>如果众人对你信赖有加却不过分依赖；</p>
        <p>如果你能惜时如金利用每一分钟不可追回的光阴；</p>
        <p>那么，你的修为就会如天地般博大，并拥有了属于自己的世界，</p>
        <p>更重要的是：孩子，你成为了真正顶天立地之人！</p>
      </div>
    </div>
  )
}

export default Quotes;