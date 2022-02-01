import {Theme, Tooltip, withStyles} from "@material-ui/core";

export const ChangeNameTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
        position:'absolute',
        top: '20px',
        width:'90px'
    },
}))(Tooltip);


export const DeleteTooltip = withStyles((theme)=>({
    tooltip:{
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
        position:'absolute',
        top: '-12px',
        width:'50px',
        right:'-20px'
    }
}))(Tooltip)
