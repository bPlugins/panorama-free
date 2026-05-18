import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Demos from '../../../../bpl-tools/Admin/Demos';
import Pricing from '../../../../bpl-tools/Admin/Pricing';
import FeatureCompare from '../../../../bpl-tools/Admin/FeatureCompare';
import Activation from '../../../../bpl-tools/Admin/Activation';
import OurPlugins from '../../../../bpl-tools/Admin/OurPlugins';

import Layout from './Layout';
import Welcome from './Welcome';
import { demoInfo, pricingInfo } from '../utils/data';
import useBlocksSettings from '../hooks/useBlocksSettings';
import blocks from '../utils/blocks';
import Blocks from '../../../../bpl-tools/Admin/Blocks';

const App = (props) => {
	const { isPremium, hasPro, action, nonce } = props;
	const { data, internalStatus, saveToBackend } = useBlocksSettings(action, nonce);

	return <Router>
		<Routes>
			<Route path='/' element={<Layout {...props} />}>
				<Route index element={<Welcome {...props} />} />

				<Route path='welcome' element={<Welcome {...props} />} />

				<Route path='blocks' element={
					<Blocks
						{...props}
						pageTitle='All Blocks'
						allBlocks={blocks}
						disabledBlocks={data}
						status={internalStatus}
						onChange={saveToBackend}
					/>
				}
				/>

				<Route path='demos' element={<Demos demoInfo={demoInfo} {...props} />} />

				{!isPremium && <Route path='pricing' element={<Pricing pricingInfo={pricingInfo} options={{}} {...props} />} />}

				{!isPremium && <Route path='feature-comparison' element={<FeatureCompare plans={['free', 'pro']} {...props} />} />}

				{hasPro && <Route path='activation' element={<Activation {...props} />} />}

				<Route path='our-plugins' element={<OurPlugins {...props} />} />

				<Route path='*' element={<Navigate to='/welcome' replace />} />
			</Route>
		</Routes>
	</Router>
}
export default App;