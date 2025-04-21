import React, {FC} from 'react';
import {IManager} from "@/models/IManager";
import ManagerComponent from "@/components/manager.component";
interface IProps {
    managers: IManager[];
}
const ManagerListComponent:FC<IProps> = ({managers}) => {
    return (
        <div>
            {
                managers.map(manager => <ManagerComponent manager={manager} key={manager._id}/>)
            }
        </div>
    );
};

export default ManagerListComponent;