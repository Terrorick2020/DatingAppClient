import { PlanLabelSvgType } from '@/types/ui.types';

import PlansLabel from '@/components/UI/PlansLabel';
import Timer from '@/components/UI/Timer';

import PngWoman from '@/assets/img/woman.png';


const LikesCard= () => {
    return (
        <>
            <div className="card">
                <div className="card__content">
                    <div
                        className="substance"
                        style={{
                            backgroundImage: `url(${ PngWoman })`,
                        }}
                    >
                        <div className="label-panel">
                            <PlansLabel type={ PlanLabelSvgType.success } />
                        </div>
                        <div className="time-panel">
                            <Timer value="11:10:41" isCritical={false} />
                        </div>
                    </div>
                    <h5 className="name">Виктория, 20</h5>
                </div>
            </div>
        </>
    )
}

export default LikesCard;
