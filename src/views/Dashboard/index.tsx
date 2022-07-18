import { DynamicList } from "components/DynamicList"
import { useState } from "react"

export const Dashboard = () => {
  const [phones, setPhones] = useState<string[]>(['809-032-3112', '829-021-3113', '829-032-2158']);


  return <div>

    {/* <DynamicList title="manage contacts" values={phones} onChange={setPhones} /> */}
  </div>
}