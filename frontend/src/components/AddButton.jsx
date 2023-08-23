import AddIcon  from "../assets/add.svg";
import { Link } from 'react-router-dom'

export default function AddButton(){
    return(
        <Link to="/note/new" className="floating-button">
            <img src={AddIcon}/>
        </Link>
    )
}