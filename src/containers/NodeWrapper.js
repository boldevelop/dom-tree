import React from "react";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";

import Node from '../components/Node';
import * as n from "../core/node";
import * as l from "../core/list";
import {Box} from "@material-ui/core";
import {NodeName} from "../components/NodeName";
import {NodeAttributes} from "../components/NodeAttributes";

export const NodeWrapper = ({node, index, id, setName, setAttrs, setContent}) => {
    let isNodeString = false;
    let content = [];
    let name = '';
    let recalculatedId = id;
    let attrs = l.l();
    if (typeof node === 'string') {
        isNodeString = true;
    } else {
        name = n.getName(node) ? n.getName(node) : 'textNode';
        content = n.getContent(node);
        recalculatedId = n.getId(node);
        attrs = n.getAttrs(node);
    }
    const updateName = (name) => {
        setName(recalculatedId, name);
    };

    return (
        <>
            {isNodeString ? (
                <Node
                    setContent={setContent}
                    content={node}
                    index={index}
                    id={recalculatedId}
                />
            ) : (
                <Box width={1} mb={1}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header">
                            <Grid
                                container
                                direction="column"
                                justify="flex-start"
                                alignItems="flex-start"
                                width={1}
                            >
                                <NodeName name={name} updateName={updateName}/>
                                {l.length(attrs)
                                    ? (<NodeAttributes
                                        setAttrs={setAttrs}
                                        id={recalculatedId}
                                        attrs={l.convertToArray(attrs)}
                                    />)
                                    : null}
                            </Grid>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid
                                container
                                direction="column"
                                justify="flex-start"
                                alignItems="flex-start"
                                width={1}
                            >
                                {content.length ? content.map(
                                    (el, i) => <NodeWrapper
                                        setContent={setContent}
                                        node={el}
                                        key={i}
                                        index={i}
                                        id={recalculatedId}
                                        setName={setName}
                                        setAttrs={setAttrs}
                                    />
                                ) : (
                                    <Node
                                        setContent={setContent}
                                        content={''}
                                        index={index}
                                        id={recalculatedId}
                                    />
                                )}
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Box>
            )}
        </>
    )
};
