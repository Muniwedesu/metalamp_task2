const circleSize = 2;
export function createWrapper() {
  const animationWrapper = document.createElement("div");
  animationWrapper.classList.add("animation");
  animationWrapper.style.zIndex = "-1";
  animationWrapper.style.boxSizing = "border-box";
  animationWrapper.style.overflow = "hidden";
  animationWrapper.style.position = "absolute";
  animationWrapper.style.top = 0;
  animationWrapper.style.opacity = 1;
  animationWrapper.style.left = "50%";
  animationWrapper.style.transform = `translateX(${-50}%)`;
  animationWrapper.style.height = "100%";
  animationWrapper.style.borderRadius = "2rem";
  animationWrapper.willChange = "opacity";
  // animationWrapper.style.border = "1px solid blue";
  // animationWrapper.style.overflow = "visible";
  return animationWrapper;
}

export function setWrapperWidth(wrapper, isDesktop) {
  let translateX = isDesktop ? 120 : 105;
  wrapper.style.width = `${translateX}%`;
}
export function calculateCircleDimensions({
  animationObject,
  layerX,
  itemWidth,
  circleSize = 2,
}) {
  const parentDimensions = {
    height: animationObject.getBoundingClientRect().height,
    width: animationObject.getBoundingClientRect().width,
  };

  let c = parentDimensions.height;
  let r = parentDimensions.width * 0.5;

  //4 is magic number used not to calculate circle radius so it will fill
  // wrapper container in every position
  let h = r - Math.sqrt(r * r - c * c * 0.25) + 4;
  if (!h) h = parentDimensions.height * 0.25;
  console.log(`h = ${h}`);

  let scaledOffset = layerX * (parentDimensions.width / itemWidth);

  r += Math.abs(scaledOffset - parentDimensions.width * 0.5);
  // console.log(`offset = ${layerX}`);
  // console.log(`scaled offset = ${scaledOffset}`);
  // console.log(`width = ${parentDimensions.width}`);
  // console.log(`r' = ${r}`);

  return {
    ratio: (2 * (r + h)) / circleSize,
    leftOffset: scaledOffset,
  };
}
export function createCircle() {
  const circle = document.createElement("div");
  circle.classList.add("animation__circle");
  //it'll need to be created every time IG
  //or I can just reposition it each time idk

  //move all of this to css?
  circle.style.width = `${circleSize}px`;
  circle.style.height = `${circleSize}px`;

  circle.style.position = "absolute";
  circle.style.borderRadius = "100%";
  circle.style.backgroundColor = "#000";
  circle.style.opacity = 0;
  // circle.style.transform = "translateX(-50%)";
  // circle.style.left = "50%";
  //just offset it by the cursor position
  // isn't it enough to just set left-top offsets?
  //
  circle.style.left = 0;
  circle.style.zIndex = "-1";
  // circle.style.right = 0;
  // circle.style.top = "50%";
  // circle.style.marginRight = "auto";
  // circle.style.marginLeft = "auto";
  circle.style.transform = "translateX(-50%)";
  circle.style.transform += "translateY(-50%)";
  circle.style.willChange = "transform, opacity";
  return circle;
}

export function addCenterMarkers(target) {
  let circleCenter = document.createElement("div");
  circleCenter.style.position = "absolute";
  circleCenter.style.top = "50%";
  circleCenter.style.left = "50%";
  circleCenter.style.transform = "translateX(-50%)";
  circleCenter.style.transform += "translateY(-50%)";
  circleCenter.style.width = "1px";
  circleCenter.style.height = "100%";
  circleCenter.style.background = "red";
  let circleCenterH = document.createElement("div");
  circleCenterH.style.position = "absolute";
  circleCenterH.style.top = "50%";
  circleCenterH.style.transform += "translateY(-50%)";
  circleCenterH.style.width = "100%";
  circleCenterH.style.height = "1px";
  circleCenterH.style.background = "red";
  target.appendChild(circleCenter);
  target.appendChild(circleCenterH);
}
