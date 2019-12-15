import React from 'react';
import * as node from '../core/node';
import {NodeWrapper} from "./NodeWrapper";
import AddNode from "../components/AddNode";
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nodes: null
        };
    }
    updateNodes = newNodes => {
        console.log(node.createNodeFromForm(newNodes));
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
    setContent = (id, content) => {
        this.setState({
            nodes: node.insertChangedContentNode(this.state.nodes, id, content)
        });
    };
    render() {
        const { nodes } = this.state;
        const attrs = [
            {
                name: 'class',
                value: 'container'
            }, {
                name: 'data-type',
                value: 'htmlNode'
            }];
        const aAtrs = [
            {
                name: 'href',
                value: '#'
            }];
        const tNode = node.singleNode('br', []);
        const aNode = node.htmlNode('a', aAtrs, ['this is a link']);
        const mainNode = node.htmlNode('div', attrs, ['some text', tNode, 'another text', aNode]);

        let content = (
            <Box width={1} height={1} mt={5}>
                <Grid container justify='center' alignItems='center'>
                    <Box width="75%">
                        <Paper style={{ padding: 16 }}>
                            <AddNode updateNodes={this.updateNodes}/>
                        </Paper>
                    </Box>
                </Grid>
            </Box>
        );
        if (nodes) {
            content = (
                <Box width={1} height={1} mt={5}>
                    <Grid container justify='center' alignItems='center'>
                        <Box width="90%">
                            <NodeWrapper
                                node={nodes}
                                setName={this.setName}
                                setAttrs={this.setAttrs}
                                setContent={this.setContent}
                            />
                        </Box>
                    </Grid>
                </Box>
            );
        }

        return content;
    }
}

export default Main;
