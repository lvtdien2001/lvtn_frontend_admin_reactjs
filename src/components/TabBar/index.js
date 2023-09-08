import { Tab, Tabs, Row, Col } from 'react-bootstrap';

const TabBar = ({ tabs, setMessage }) => {
    /** Ex tabs: [{
     *      key: 'home',
     *      title: 'Home',
     *      component: <Home />
     *  }] 
     * */
    return (
        <Row className='justify-content-center'>
            <Col lg={10}>
                <Tabs
                    defaultActiveKey={tabs[0].key}
                    className="mb-3 mt-3"
                >
                    {tabs.map(tab => {
                        const Component = tab.component;
                        return (
                            <Tab key={tab.key} eventKey={tab.key} title={tab.title}>
                                <h3 className='text-center mt-3 mb-3'>{tab.title?.toUpperCase()}</h3>
                                <Component setMessage={setMessage} />
                            </Tab>
                        )
                    })}
                </Tabs>
            </Col>
        </Row>
    );
}

export default TabBar
