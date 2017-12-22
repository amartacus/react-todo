import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
    <p>
        <button
            onClick={onUndo}
            disabled={!canUndo}
        > 
            Undo 
        </button>
        <button
            onClick={onRedo}
            disabled={!canRedo}
        > 
            Redo 
        </button>
    </p>
);
const mapStateToUndoRedoProps = (state) => {
    console.log(state);
    return {
        canUndo: state.todos.past.length > 0,
        canRedo: state.todos.future.length > 0
    }
};

const mapDispatchToUndoRedoProps = {
    onUndo: UndoActionCreators.undo,
    onRedo: UndoActionCreators.redo
};
export default connect(mapStateToUndoRedoProps, mapDispatchToUndoRedoProps)(UndoRedo);