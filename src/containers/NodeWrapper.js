import React from "react";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";

import Node from '../components/Node';
import * as n from "../core/node";
import {Box} from "@material-ui/core";
import {NodeName} from "../components/NodeName";

export const NodeWrapper = ({node, index, id, setName}) => {
    let isNodeString = false;
    let content = [];
    let name = '';
    let recalculatedId = id;
    if (typeof node === 'string') {
        isNodeString = true;
    } else {
        name = n.getName(node) ? n.getName(node) : 'textNode';
        content = n.getContent(node);
        recalculatedId = n.getId(node);
    }
    const updateName = (name) => {
        setName(index, recalculatedId, name);
    };

    return (
        <>
            {isNodeString ? (
                <Node content={node} index={index} id={recalculatedId}/>
            ) : (
                <Box width={1} mb={1}>
                    {content.length ? (
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-label="Expand"
                                aria-controls="additional-actions1-content"
                                id="additional-actions1-header">
                                <NodeName name={name} updateName={updateName}/>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid
                                    container
                                    direction="column"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                    width={1}
                                >
                                    {content.map(
                                        (el, i) => <NodeWrapper node={el} key={i} index={i} id={recalculatedId} setName={setName}/>
                                    )}
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ) : (
                        <Box pl={3}>
                            <NodeName name={name} updateName={updateName}/>
                        </Box>
                    )}
                </Box>
            )}
        </>
    )
};
