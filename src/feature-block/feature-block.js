import "./feature-block.css"

const FeatureBlock = (props) => {

    return (
        <div className="featureBox" onClick={props.onClick}>
            <div className="featureContent">
                <div className="featureText">
                    <p className="featureName">{props.featureName}</p>
                    <p className="featureValue">{props.featureValue}</p>
                </div>
                <img className="featureIcon" alt="temperature" src={props.featureIcon} />
            </div>
        </div>
    );
}

export default FeatureBlock;