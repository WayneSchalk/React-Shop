import React, {useState} from 'react'
import {Form, Button} from "react-bootstrap"
const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState("")
    const submitHandler =(e)=> {
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push("/")
        }
    }
    return (
        <div>
            <Form onSubmit={submitHandler} inline>
                <Form.Control placeholder="Search Products ... " type="text" name="q" className="mr-sm-2 ml-sm-5"  onChange={e => setKeyword(e.target.value)}>
                  
                    
                    </Form.Control>
                    <Button type="submit" variant="primary" className=" p2">Search</Button>
            </Form>
        </div>
    )
}

export default SearchBox
