import React from 'react';
import * as node from '../core/node';
import {NodeWrapper} from "./NodeWrapper";
import AddNode from "../components/AddNode";
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nodes: null
        };
    }
    updateNodes = newNodes => {
        this.setState({
            nodes: node.createNodeFromForm(newNodes)
        })
    };
    setName = (id, name) => {
        this.setState({
            nodes: node.insertChangedNameNode(this.state.nodes, id, name)
        });
    };
    setAttrs = (id, attrs) => {
        this.setState({
            nodes: node.insertChangedAttrsNode(this.state.nodes, id, attrs)
        });
    };
    setContent = (id, content, index) => {
        this.setState({
            nodes: node.insertChangedContentNode(this.state.nodes, id, content, index)
        });
    };
    render() {
        const { nodes } = this.state;
        return (
            <Box width={1} height={1} mt={5}>
                <Grid container justify='center' alignItems='center'>
                    <Box width="90%">
                        {nodes ? (
                            <>
                                <Box mb={2}>
                                    <Paper style={{ padding: 16 }}>
                                        <Typography color="textSecondary">
                                            Чтобы редактировать ноды необходимо кликнуть по имени, аттрибутам и
                                            текстовому контенту. Кнопку добавления аттрибутов,
                                            когда они пустые и удалени нод, не успел
                                        </Typography>
                                    </Paper>
                                </Box>
                                <NodeWrapper
                                    node={nodes}
                                    setName={this.setName}
                                    setAttrs={this.setAttrs}
                                    setContent={this.setContent}
                                />
                            </>
                        ) : (
                            <>
                                <Box mb={2}>
                                    <Paper style={{ padding: 16 }}>
                                        <Typography color="textSecondary">
                                            Нода это подобие html тэгов. Имеются три вида парные, не парные и текстовые
                                            Форма тормозит из-за вложенных динамичных полей
                                        </Typography>
                                    </Paper>
                                </Box>
                                <Paper style={{ padding: 16 }}>
                                    <AddNode updateNodes={this.updateNodes}/>
                                </Paper>
                            </>
                        )}
                    </Box>
                </Grid>
            </Box>
        );
    }
}

export default Main;
