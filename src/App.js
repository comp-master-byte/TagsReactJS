import React,{useEffect, useRef, useState} from 'react'
import './style/main.scss'
import styled from 'styled-components'
import { MyButton } from './UI/MyButton'
import {BsTagsFill} from 'react-icons/bs'
import { MyInput } from './UI/input/MyInput'
import { LilButton } from './UI/button/LilButton'
import {AiFillDelete} from 'react-icons/ai'

const Section = styled.div`
  width: 100%;
  background: linear-gradient(90deg, #111, #333);
  `
  
  const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`

const TagField = styled.div`
  width: 650px;
  background: #fff;
  border-radius: 12px;
  padding: 25px 30px;
`

const TagFieldContent = styled.div`

`

const TegsArea = styled.div`
  width: 100%;
  box-shadow: 0 0 2px #000;
  margin: 20px 0;
  border-radius: 4px;
  padding-bottom:10px;
`

const FooterInfo = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top:20px;
`

const TagElement = styled.div`
  border: 1px solid #000;
  display: inline-block;
  margin-left: 10px;
  margin-top: 10px;
  padding: 4px 10px;
  border-radius: 8px;
`

function App() {

  const [disabled, setDisabled] = useState(false)
  const [counter, setCounter] = useState(10) // счётчик - работает на полную мощность
  const [tags, setTags] = useState([])
  const tagRef = useRef()

  useEffect(() => {
    const tagArea = document.querySelector('#tagArea')

    if(tags.length === 0) {
      tagArea.style.display = 'none'
    } else {
      tagArea.style.display = 'block'
    }
  },[tags])

  const addNewTag = e => {
      e.preventDefault()
      
      const pTeg = document.querySelector('.warning')

      const newTag = {
        id: Date.now(),
        tagName: tagRef.current.value
      }

      // Логика добавления тега
      if (newTag.tagName === '') {
          pTeg.classList.add('active')
          return
      } else {
          if(newTag.tagName.includes(',' || ',')){
            const splitedTag = newTag.tagName.split(",").map((tag, index) => {
              return {tagName: tag, id: Date.now() + index}
              }
            )
            setTags(tags.concat(splitedTag))
            setCounter(counter - splitedTag.length)
            tagRef.current.value = ''
          } else {
            setCounter(counter - 1)
            setTags([...tags, newTag])
            pTeg.classList.remove('active')
            tagRef.current.value = ''
          }
      }  

      if(counter === 1) {
        tagRef.current.value = ''
        setDisabled(prev => !prev)
      }
  }

    // Удаление всех тегов
    const removeAllTags = e => {
      e.preventDefault()
      setCounter(counter + tags.length)
      setTags([])
    }

    // Удаление определенного тега
    const removeOneTag = (removeTag) => {
      setTags(tags.filter(t => t.id !== removeTag.id))
      setCounter(counter + 1)
    }

  return (
    <Section>
        <Container>
            <TagField>  
                <TagFieldContent>
                    <div style={{display: 'flex', alignItems:'center'}}>
                        <BsTagsFill size={'40px'}/>
                        <div style={{marginLeft:'10px', fontSize: '28px'}}>Теги</div>
                    </div>
                    <div style={{margin: '15px 0', fontSize: '18px'}}>Введенное вами слово будет преобразовано в тег</div>
                    <form style={{display:'flex', justifyContent:'space-between'}}>
                        <MyInput             
                            ref={tagRef} 
                            type="text" 
                            placeholder='Введите слово'
                        />
                        <MyButton disabled={disabled} onClick={addNewTag} style={{marginLeft:'10px'}}>Создать тег</MyButton>
                    </form>
                    <p className='warning'>Введите сначала тег!!!</p>
                    <TegsArea id='tagArea'>  
                        {tags.map(tag => 
                              <TagElement key={tag.id}>
                                  <div style={{display:'flex', alignItems:'center'}}>
                                      <div style={{marginRight:'5px'}}>{tag.tagName}</div>  
                                      <AiFillDelete onClick={() => removeOneTag(tag)} cursor={'pointer'}/>
                                  </div>
                              </TagElement>
                            )
                          }
                    </TegsArea>
                    <FooterInfo>
                        <LilButton onClick={removeAllTags}>Удалить все</LilButton>
                        <div style={{fontSize:'18px'}}>Максмально количество тегов: {counter}</div>
                    </FooterInfo>
                </TagFieldContent>
            </TagField>
        </Container>
    </Section>
  );
}

export default App;
