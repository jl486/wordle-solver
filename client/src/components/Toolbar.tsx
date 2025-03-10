import Gear from "../assets/gear.svg?react";
import Help from "../assets/help.svg?react";
import Stats from "../assets/stats.svg?react";

export default function Toolbar() {
  return (
    <header
      className="
          w-full flex flex-row justify-between items-center h-14 px-3
          border-b-[1px] border-border-light dark:border-border-dark
        "
    >
      <button className="p-2">
        <Help className="fill-black dark:fill-white" />
      </button>
      <h1 className="font-bold text-3xl tracking-widest absolute left-0 right-0 pointer-events-none text-center">WORDLE</h1>
      <div>
        <button className="p-2">
          <Stats className="fill-black dark:fill-white" />
        </button>
        <button className="p-2">
          <Gear className="fill-black dark:fill-white" />
        </button>
      </div>
    </header>
  )
}
