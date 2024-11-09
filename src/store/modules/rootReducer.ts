import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './User/userSlice';
import loadingSlice from './Loading/loadingSlice';
import modalContextSlice from './ModalContext/modalContextSlice';
import timeSlice from './Time/timeSlice';
import disciplineSlice from './Discipline/disciplineSlice';

const rootReducer = combineReducers({
	// a cada novo slice, adicionamos uma nova propriedade neste objeto
	// propriedade - nome na store
	// valor - reducer/manager deste estado global
	// modal: modalSlice,
	// modal: modalTarefasSlice,
	user: userSlice,
	time: timeSlice,
	discipline: disciplineSlice,
	loading: loadingSlice,
	context: modalContextSlice,
});

export default rootReducer;
