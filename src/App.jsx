import { useState, useRef } from "react";

const CATEGORIES = [
  { id: "jiaozi", label: "饺子馄饨", emoji: "🥟", color: "#FF6B6B", bg: "#FFF0F0" },
  { id: "burger", label: "汉堡薯条", emoji: "🍔", color: "#FF9F43", bg: "#FFF5E6" },
  { id: "pasta",  label: "意面披萨", emoji: "🍕", color: "#F9CA24", bg: "#FFFBE6" },
  { id: "baozi",  label: "包子粥店", emoji: "🥢", color: "#6AB04C", bg: "#F0FAF0" },
  { id: "bento",  label: "快餐便当", emoji: "🍱", color: "#22A6B3", bg: "#E8FAFB" },
  { id: "dessert",label: "甜品饮品", emoji: "🧋", color: "#BE2EDD", bg: "#FAF0FF" },
];

const LAYOUTS = [
  { id:"l1", name:"九宫格主图", desc:"首图大图+8张细节，冲击力强",
    preview:(
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:3,width:108,height:108}}>
        {[...Array(9)].map((_,i)=>(
          <div key={i} style={{background:i===0?"#FF6B6B":"#FFB3B3",borderRadius:3}}/>
        ))}
      </div>
    )},
  { id:"l2", name:"左右对比图", desc:"before/after 或双产品对比",
    preview:(
      <div style={{display:"flex",gap:4,width:108,height:108}}>
        <div style={{flex:1,background:"#FF6B6B",borderRadius:6,display:"flex",alignItems:"flex-end",justifyContent:"center",paddingBottom:6}}>
          <div style={{width:36,height:5,background:"white",borderRadius:3,opacity:.8}}/>
        </div>
        <div style={{flex:1,background:"#FFB3B3",borderRadius:6,display:"flex",alignItems:"flex-end",justifyContent:"center",paddingBottom:6}}>
          <div style={{width:36,height:5,background:"white",borderRadius:3,opacity:.8}}/>
        </div>
      </div>
    )},
  { id:"l3", name:"大图+文字贴", desc:"封面大图配标题卡片，直接吸睛",
    preview:(
      <div style={{position:"relative",width:108,height:108}}>
        <div style={{width:"100%",height:"100%",background:"#FF6B6B",borderRadius:8}}/>
        <div style={{position:"absolute",bottom:8,left:8,right:8,background:"white",borderRadius:5,padding:"4px 6px"}}>
          <div style={{height:5,background:"#FF6B6B",borderRadius:3,marginBottom:3,width:"80%"}}/>
          <div style={{height:4,background:"#FFB3B3",borderRadius:3,width:"55%"}}/>
        </div>
      </div>
    )},
  { id:"l4", name:"多图拼接流", desc:"主图+副图组合，内容丰富",
    preview:(
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gridTemplateRows:"1fr 1fr",gap:3,width:108,height:108}}>
        <div style={{background:"#FF6B6B",borderRadius:5,gridRow:"1/3"}}/>
        <div style={{background:"#FFB3B3",borderRadius:5}}/>
        <div style={{background:"#FFCCCC",borderRadius:5}}/>
      </div>
    )},
];

const TITLE_FORMATS = [
  { id:"t1", label:"土著私藏型", example:"🌶️{店名}土著私藏✅不踩雷清单｜吃到撑才50+" },
  { id:"t2", label:"情绪共鸣型", example:"谁懂啊😭{商品}真的封神！本地人反复冲" },
  { id:"t3", label:"避坑指南型", example:"别再冲网红店了｜土著带路吃{店名}最地道家常味" },
  { id:"t4", label:"感受描述型", example:"✨糯叽叽+辣乎乎，{商品}每口都上头（附路线+价格）" },
  { id:"t5", label:"悬念钩子型", example:"藏在老巷里的{店名}｜大众点评找不到，只有本地人知道" },
  { id:"t6", label:"数字清单型", example:"实测{店名}｜人均{价格}以内能吃到这种水平？太离谱了😱" },
];

const BODY_FORMATS = [
  { id:"b1", label:"土著私藏·烟火向",
    preview:"📝来交作业啦！整理了不踩雷清单👇\n\n🔥必吃推荐（人均xx元）\n✅{店名}：{商品}，精华在于xxx，本地人反复冲😋\n\n💡土著小tips：xxx时间段去最佳！\n\n#话题标签" },
  { id:"b2", label:"路线导向·逛吃向",
    preview:"✅逛吃路线封神！一天吃遍不绕路👣\n\n📍{店名}（推荐时间）\n必吃：{商品}，特色：xxx\n\n🥢胃容量分配建议：xxx\n\n#话题标签" },
  { id:"b3", label:"干货细节·老饕向",
    preview:"真正的美味从不在网红滤镜里🌶️\n\n🍜{店名}（老食客的心头好）\n✅{商品}：精髓在xxx，人均{价格}，闭眼点不踩雷\n\n🍲进阶款｜记得领券更划算\n\n#话题标签" },
  { id:"b4", label:"种草清单·快消向",
    preview:"姐妹们！这几样真的绝绝子💥\n\n第①个：{商品}📌\n→ 口感：xxx\n→ 价格：{价格}\n→ 推荐指数：⭐⭐⭐⭐⭐\n\n冲就完了，不好吃你来打我😜\n\n#话题标签" },
  { id:"b5", label:"剧情代入·故事向",
    preview:"上周带闺蜜第一次来{店名}，她直接说「以后每次必吃」😭\n\n我们点了：{商品}\n\n好了不说了，地址放这里👇\n📍{店铺地址}\n\n#话题标签" },
  { id:"b6", label:"测评对比·专业向",
    preview:"实测对比 | {店名} vs 同类店，谁更值？🧐\n\n┌ 口味：{商品} xxx\n├ 价格：{价格}\n└ 排队：xxx\n\n🏆综合推荐：{店名}，理由是xxx\n\n#话题标签" },
];

const STEPS = ["选方向","选排版","选标题","选正文","店铺信息","上传图片"];

async function generateNote({ category, layout, titleFormat, bodyFormat, shopInfo }) {
  const catLabel = CATEGORIES.find(c=>c.id===category)?.label||"";
  const titleEx  = TITLE_FORMATS.find(t=>t.id===titleFormat)?.example||"";
  const bodyEx   = BODY_FORMATS.find(b=>b.id===bodyFormat)?.preview||"";
  const layoutName = LAYOUTS.find(l=>l.id===layout)?.name||"";
  const { shopName, products, address, priceRange } = shopInfo;

  const prompt = `你是一位小红书爆款图文笔记写手，风格：emoji开头、口语化、真实感强、带"土著""闭眼冲""绝绝子"等种草词、结构清晰。

根据以下信息生成一篇完整小红书笔记：
- 餐饮方向：${catLabel}
- 图片排版：${layoutName}
- 店铺名称：${shopName}
- 主推商品：${products}
- 地址/区域：${address}
- 价格区间：${priceRange}
- 标题风格参考：${titleEx}
- 正文结构参考：
${bodyEx}

要求：
1. 先输出1个吸睛标题（带emoji，把店铺名、商品名自然嵌入）
2. 输出完整正文，把店铺名"${shopName}"、商品"${products}"、地址"${address}"、价格"${priceRange}"自然嵌入正文，不要用占位符
3. 最后输出5个话题标签
4. 保持小红书爆款语气，直接输出笔记内容，不要任何开场白`;

  console.log("开始生成笔记...");

  const res = await fetch("http://localhost:3001/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt })
  });

  console.log("响应状态:", res.status);
  const data = await res.json();
  console.log("响应数据:", data);

  if (data.success) {
    return data.content;
  }

  throw new Error(data.error || "生成失败");
}

export default function App() {
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState({ category:null, layout:null, titleFormat:null, bodyFormat:null });
  const [shopInfo, setShopInfo] = useState({ shopName:"", products:"", address:"", priceRange:"" });
  const [images, setImages] = useState([]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const accent = sel.category ? CATEGORIES.find(c=>c.id===sel.category)?.color||"#FF6B6B" : "#FF6B6B";
  const back = () => { setStep(s=>s-1); if(step===6) setResult(""); };

  const shopValid = shopInfo.shopName.trim() && shopInfo.products.trim() && shopInfo.address.trim() && shopInfo.priceRange.trim();

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    const remaining = 9 - images.length;
    const toAdd = files.slice(0, remaining).map(f=>({ file:f, url:URL.createObjectURL(f) }));
    setImages(prev=>[...prev, ...toAdd]);
    e.target.value="";
  };

  const removeImage = (i) => setImages(prev=>prev.filter((_,idx)=>idx!==i));

  const handleGenerate = async () => {
    setLoading(true); setResult(""); setStep(6);
    try {
      const text = await generateNote({ ...sel, shopInfo });
      setResult(text);
    } catch (error) {
      console.error("生成错误:", error);
      setResult(`生成失败 😢\n\n错误信息: ${error.message}\n\n请检查浏览器控制台查看详细日志`);
    }
    setLoading(false);
  };

  const reset = () => {
    setSel({category:null,layout:null,titleFormat:null,bodyFormat:null});
    setShopInfo({shopName:"",products:"",address:"",priceRange:""});
    setImages([]); setResult(""); setStep(0);
  };

  const inputStyle = {
    width:"100%", padding:"11px 14px", borderRadius:10, border:"1.5px solid #EEE",
    fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit",
    transition:"border-color 0.15s"
  };
  const labelStyle = { fontSize:13, fontWeight:600, color:"#555", marginBottom:6, display:"block" };

  const ConfirmBtn = ({ disabled, onClick, label="确认，下一步 →" }) => (
    <button onClick={onClick} disabled={disabled} style={{
      flex:2, padding:"13px 0", borderRadius:14, border:"none",
      background:disabled?"#EEE":accent, color:disabled?"#AAA":"white",
      fontSize:15, fontWeight:700, cursor:disabled?"not-allowed":"pointer",
      boxShadow:disabled?"none":`0 4px 14px ${accent}55`, transition:"all 0.2s"
    }}>{label}</button>
  );
  const BackBtn = () => (
    <button onClick={back} style={{
      flex:1, padding:"13px 0", borderRadius:14, border:"2px solid #EEE",
      background:"white", color:"#888", fontSize:15, fontWeight:600, cursor:"pointer"
    }}>← 上一步</button>
  );

  return (
    <div style={{minHeight:"100vh", background:"#FFF8F5", fontFamily:"'PingFang SC','Helvetica Neue',sans-serif"}}>
      {/* Header */}
      <div style={{background:"white", padding:"14px 20px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", position:"sticky", top:0, zIndex:10}}>
        <div style={{maxWidth:480, margin:"0 auto"}}>
          <div style={{fontSize:17, fontWeight:700, color:"#222", marginBottom: step>0&&step<6 ? 10 : 0}}>
            ✍️ 图文笔记生成器
          </div>
          {step>0 && step<6 && (
            <div style={{display:"flex", gap:4, alignItems:"center"}}>
              {STEPS.map((l,i)=>(
                <div key={i} style={{display:"flex", alignItems:"center", gap:3}}>
                  <div style={{
                    width:20, height:20, borderRadius:"50%",
                    background: i<step ? accent : i===step ? accent : "#EEE",
                    color: i<=step?"white":"#AAA",
                    fontSize:10, fontWeight:700,
                    display:"flex", alignItems:"center", justifyContent:"center"
                  }}>{i<step?"✓":i+1}</div>
                  <span style={{fontSize:10, color:i<=step?"#333":"#AAA", fontWeight:i===step?700:400, whiteSpace:"nowrap"}}>{l}</span>
                  {i<5 && <span style={{color:"#DDD", fontSize:10, marginLeft:1}}>›</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{maxWidth:480, margin:"0 auto", padding:"20px 16px"}}>

        {/* STEP 0: 选方向 */}
        {step===0 && (
          <div>
            <div style={{fontSize:20,fontWeight:700,color:"#222",marginBottom:4}}>选择你的餐饮方向 🍽️</div>
            <div style={{fontSize:13,color:"#888",marginBottom:20}}>选一个方向，AI 将为你量身生成爆款笔记</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {CATEGORIES.map(c=>(
                <div key={c.id} onClick={()=>setSel(s=>({...s,category:c.id}))} style={{
                  background:sel.category===c.id?c.color:"white",
                  border:`2px solid ${sel.category===c.id?c.color:"#F0EEE8"}`,
                  borderRadius:16, padding:"18px 14px", cursor:"pointer",
                  boxShadow:sel.category===c.id?`0 4px 16px ${c.color}44`:"0 2px 8px rgba(0,0,0,0.04)",
                  transition:"all 0.15s"
                }}>
                  <div style={{fontSize:32,marginBottom:8}}>{c.emoji}</div>
                  <div style={{fontSize:15,fontWeight:700,color:sel.category===c.id?"white":"#333"}}>{c.label}</div>
                </div>
              ))}
            </div>
            <button onClick={()=>setStep(1)} disabled={!sel.category} style={{
              width:"100%", marginTop:24, padding:"14px 0", borderRadius:14, border:"none",
              background:sel.category?accent:"#EEE", color:sel.category?"white":"#AAA",
              fontSize:16, fontWeight:700, cursor:sel.category?"pointer":"not-allowed",
              boxShadow:sel.category?`0 4px 16px ${accent}55`:"none", transition:"all 0.2s"
            }}>确认，下一步 →</button>
          </div>
        )}

        {/* STEP 1: 选排版 */}
        {step===1 && (
          <div>
            <div style={{fontSize:20,fontWeight:700,color:"#222",marginBottom:4}}>选择图片排版方式 🖼️</div>
            <div style={{fontSize:13,color:"#888",marginBottom:20}}>4种爆款排版，选一个最适合你的</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {LAYOUTS.map(l=>(
                <div key={l.id} onClick={()=>setSel(s=>({...s,layout:l.id}))} style={{
                  background:"white",
                  border:`2px solid ${sel.layout===l.id?accent:"#F0EEE8"}`,
                  borderRadius:16, padding:16, cursor:"pointer",
                  boxShadow:sel.layout===l.id?`0 4px 16px ${accent}33`:"0 2px 8px rgba(0,0,0,0.04)",
                  transition:"all 0.15s"
                }}>
                  <div style={{display:"flex",justifyContent:"center",marginBottom:10}}>{l.preview}</div>
                  <div style={{fontSize:13,fontWeight:700,color:sel.layout===l.id?accent:"#333",marginBottom:4}}>{l.name}</div>
                  <div style={{fontSize:11,color:"#999"}}>{l.desc}</div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:10,marginTop:24}}>
              <BackBtn/><ConfirmBtn disabled={!sel.layout} onClick={()=>setStep(2)}/>
            </div>
          </div>
        )}

        {/* STEP 2: 选标题 */}
        {step===2 && (
          <div>
            <div style={{fontSize:20,fontWeight:700,color:"#222",marginBottom:4}}>选择标题格式 🔥</div>
            <div style={{fontSize:13,color:"#888",marginBottom:20}}>6种爆款标题风格，选你最喜欢的</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {TITLE_FORMATS.map(t=>(
                <div key={t.id} onClick={()=>setSel(s=>({...s,titleFormat:t.id}))} style={{
                  background:"white",
                  border:`2px solid ${sel.titleFormat===t.id?accent:"#F0EEE8"}`,
                  borderRadius:14, padding:"14px 16px", cursor:"pointer",
                  boxShadow:sel.titleFormat===t.id?`0 4px 16px ${accent}33`:"0 2px 8px rgba(0,0,0,0.04)",
                  transition:"all 0.15s"
                }}>
                  <span style={{background:sel.titleFormat===t.id?accent:"#F5F3EE",color:sel.titleFormat===t.id?"white":"#888",fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:20,display:"inline-block",marginBottom:8}}>{t.label}</span>
                  <div style={{fontSize:13,color:"#555",lineHeight:1.6}}>{t.example}</div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:10,marginTop:24}}>
              <BackBtn/><ConfirmBtn disabled={!sel.titleFormat} onClick={()=>setStep(3)}/>
            </div>
          </div>
        )}

        {/* STEP 3: 选正文 */}
        {step===3 && (
          <div>
            <div style={{fontSize:20,fontWeight:700,color:"#222",marginBottom:4}}>选择正文格式 📝</div>
            <div style={{fontSize:13,color:"#888",marginBottom:20}}>6种爆款正文结构，选最适合你的风格</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {BODY_FORMATS.map(b=>(
                <div key={b.id} onClick={()=>setSel(s=>({...s,bodyFormat:b.id}))} style={{
                  background:"white",
                  border:`2px solid ${sel.bodyFormat===b.id?accent:"#F0EEE8"}`,
                  borderRadius:14, padding:"14px 16px", cursor:"pointer",
                  boxShadow:sel.bodyFormat===b.id?`0 4px 16px ${accent}33`:"0 2px 8px rgba(0,0,0,0.04)",
                  transition:"all 0.15s"
                }}>
                  <span style={{background:sel.bodyFormat===b.id?accent:"#F5F3EE",color:sel.bodyFormat===b.id?"white":"#888",fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:20,display:"inline-block",marginBottom:8}}>{b.label}</span>
                  <pre style={{fontSize:11,color:"#777",lineHeight:1.7,margin:0,whiteSpace:"pre-wrap",fontFamily:"inherit"}}>{b.preview}</pre>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:10,marginTop:24}}>
              <BackBtn/><ConfirmBtn disabled={!sel.bodyFormat} onClick={()=>setStep(4)}/>
            </div>
          </div>
        )}

        {/* STEP 4: 填写店铺信息 */}
        {step===4 && (
          <div>
            <div style={{fontSize:20,fontWeight:700,color:"#222",marginBottom:4}}>填写店铺信息 🏪</div>
            <div style={{fontSize:13,color:"#888",marginBottom:20}}>AI 将把这些信息自然融入笔记内容</div>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <div>
                <label style={labelStyle}>店铺名称 <span style={{color:accent}}>*</span></label>
                <input style={inputStyle} placeholder="例：老王家饺子馆" value={shopInfo.shopName}
                  onChange={e=>setShopInfo(s=>({...s,shopName:e.target.value}))}
                  onFocus={e=>e.target.style.borderColor=accent}
                  onBlur={e=>e.target.style.borderColor="#EEE"}/>
              </div>
              <div>
                <label style={labelStyle}>主推商品 <span style={{color:accent}}>*</span> <span style={{color:"#BBB",fontWeight:400}}>（1-3个，用逗号分隔）</span></label>
                <input style={inputStyle} placeholder="例：招牌猪肉白菜饺、酸汤水饺" value={shopInfo.products}
                  onChange={e=>setShopInfo(s=>({...s,products:e.target.value}))}
                  onFocus={e=>e.target.style.borderColor=accent}
                  onBlur={e=>e.target.style.borderColor="#EEE"}/>
              </div>
              <div>
                <label style={labelStyle}>店铺地址 / 区域 <span style={{color:accent}}>*</span></label>
                <input style={inputStyle} placeholder="例：朝阳区三里屯太古里附近" value={shopInfo.address}
                  onChange={e=>setShopInfo(s=>({...s,address:e.target.value}))}
                  onFocus={e=>e.target.style.borderColor=accent}
                  onBlur={e=>e.target.style.borderColor="#EEE"}/>
              </div>
              <div>
                <label style={labelStyle}>价格区间 <span style={{color:accent}}>*</span></label>
                <input style={inputStyle} placeholder="例：人均30-50元" value={shopInfo.priceRange}
                  onChange={e=>setShopInfo(s=>({...s,priceRange:e.target.value}))}
                  onFocus={e=>e.target.style.borderColor=accent}
                  onBlur={e=>e.target.style.borderColor="#EEE"}/>
              </div>
            </div>
            <div style={{display:"flex",gap:10,marginTop:24}}>
              <BackBtn/><ConfirmBtn disabled={!shopValid} onClick={()=>setStep(5)}/>
            </div>
          </div>
        )}

        {/* STEP 5: 上传图片 */}
        {step===5 && (
          <div>
            <div style={{fontSize:20,fontWeight:700,color:"#222",marginBottom:4}}>上传图片 📸</div>
            <div style={{fontSize:13,color:"#888",marginBottom:4}}>最多上传 9 张（小红书标准）</div>
            <div style={{fontSize:12,color:accent,fontWeight:600,marginBottom:20}}>已上传 {images.length} / 9 张</div>

            {/* 图片网格 */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
              {images.map((img,i)=>(
                <div key={i} style={{position:"relative",aspectRatio:"1",borderRadius:12,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.1)"}}>
                  <img src={img.url} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>
                  <button onClick={()=>removeImage(i)} style={{
                    position:"absolute",top:5,right:5,width:22,height:22,borderRadius:"50%",
                    background:"rgba(0,0,0,0.55)",border:"none",color:"white",
                    fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"
                  }}>✕</button>
                  {i===0 && <div style={{position:"absolute",bottom:5,left:5,background:accent,color:"white",fontSize:10,fontWeight:700,padding:"2px 6px",borderRadius:6}}>封面</div>}
                </div>
              ))}
              {images.length < 9 && (
                <div onClick={()=>fileRef.current.click()} style={{
                  aspectRatio:"1", borderRadius:12, border:`2px dashed ${accent}66`,
                  display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                  cursor:"pointer", background:`${accent}08`, transition:"all 0.15s"
                }}>
                  <div style={{fontSize:26,color:`${accent}88`,marginBottom:4}}>+</div>
                  <div style={{fontSize:11,color:`${accent}99`,fontWeight:600}}>添加图片</div>
                </div>
              )}
            </div>

            <input ref={fileRef} type="file" accept="image/*" multiple style={{display:"none"}} onChange={handleImages}/>

            {images.length===0 && (
              <div style={{background:"#FFF5F0",borderRadius:12,padding:"12px 16px",marginBottom:16,fontSize:12,color:"#AA8888",lineHeight:1.6}}>
                💡 图片仅用于版面占位，最终将由 App 处理展示效果。也可跳过直接生成文案。
              </div>
            )}

            <div style={{display:"flex",gap:10,marginTop:8}}>
              <BackBtn/>
              <ConfirmBtn disabled={false} onClick={handleGenerate} label="✨ 立即生成笔记"/>
            </div>
          </div>
        )}

        {/* STEP 6: 结果页 */}
        {step===6 && (
          <div>
            <div style={{fontSize:20,fontWeight:700,color:"#222",marginBottom:10}}>
              {loading?"AI 正在生成中… ✍️":"笔记生成完成 🎉"}
            </div>

            {/* 选择摘要 */}
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
              {[
                CATEGORIES.find(c=>c.id===sel.category),
                LAYOUTS.find(l=>l.id===sel.layout),
                TITLE_FORMATS.find(t=>t.id===sel.titleFormat),
                BODY_FORMATS.find(b=>b.id===sel.bodyFormat),
              ].filter(Boolean).map((item,i)=>(
                <span key={i} style={{background:`${accent}18`,color:accent,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20}}>
                  {item.emoji||"✓"} {item.label||item.name}
                </span>
              ))}
            </div>

            {/* 图片预览缩略 */}
            {images.length>0 && (
              <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
                {images.map((img,i)=>(
                  <div key={i} style={{position:"relative",flexShrink:0,width:52,height:52,borderRadius:8,overflow:"hidden",border:`2px solid ${i===0?accent:"#EEE"}`}}>
                    <img src={img.url} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>
                    {i===0&&<div style={{position:"absolute",bottom:0,left:0,right:0,background:accent,color:"white",fontSize:9,fontWeight:700,textAlign:"center"}}>封面</div>}
                  </div>
                ))}
              </div>
            )}

            {loading ? (
              <div style={{background:"white",borderRadius:16,padding:40,textAlign:"center",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
                <div style={{fontSize:36,marginBottom:12}}>⏳</div>
                <div style={{color:"#888",fontSize:14}}>正在为你生成专属爆款笔记…</div>
              </div>
            ) : (
              <div style={{background:"white",borderRadius:16,padding:20,boxShadow:"0 2px 12px rgba(0,0,0,0.06)",whiteSpace:"pre-wrap",fontSize:14,lineHeight:1.9,color:"#333"}}>
                {result}
              </div>
            )}

            {!loading && (
              <div style={{display:"flex",gap:10,marginTop:20}}>
                <BackBtn/>
                <button onClick={reset} style={{
                  flex:1,padding:"13px 0",borderRadius:14,border:"none",
                  background:accent,color:"white",fontSize:15,fontWeight:700,
                  cursor:"pointer",boxShadow:`0 4px 14px ${accent}55`
                }}>重新开始 🔄</button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}