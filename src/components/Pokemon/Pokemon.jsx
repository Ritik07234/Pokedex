import './Pokemon.css';
import { Link } from 'react-router-dom';
function Pokemon({name,image,id}){
    return(
        
        <div className='pokemon'>
            <Link to={`/pokemon/${id}`}>
                <div>
                    <img className='pokemon-image' src={image}/>
                </div>
                <div className='name'>{name}</div>
            </Link>
        </div>
    )
}
export default Pokemon;