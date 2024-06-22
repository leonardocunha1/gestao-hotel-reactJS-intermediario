import { useEffect, useRef } from "react";

/*
 * No if está sendo verificado se o click foi fora do modal. Explicando mais detalhadamente: se o ref.current for diferente de null e o click não foi dentro do modal, então o modal é fechado.
 */

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(event) {
        // console.log(event.target);
        // console.log(ref.current);
        if (ref.current && !ref.current.contains(event.target)) {
          handler();
        }
      }

      function handleKeyDown(event) {
        if (event.key === "Escape") {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);
      document.addEventListener("keydown", handleKeyDown, listenCapturing);

      return function () {
        document.removeEventListener("click", handleClick, listenCapturing);
        document.removeEventListener("keydown", handleKeyDown, listenCapturing);
      };
    },
    [handler, listenCapturing]
  );

  return ref;
}
