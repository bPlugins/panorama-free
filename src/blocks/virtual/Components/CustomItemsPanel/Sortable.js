import { useEffect, useState } from "react";
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import "./Sortable.scss";
import { closeIcon, copyIcon, gripIcon } from "../../../../../../bpl-tools/utils/icons";

// Scenes are dragged by the grip icon only, as before (react-sortable-hoc's useDragHandle).
const SortableItem = ({
  id,
  index,
  removeItem,
  duplicateItem,
  ItemSettings,
  active,
  setActive,
  itemLabel,
  title,
  ...props
}) => {
  const { attributes, arrKey, setActiveIndex } = props;
  const items = attributes[arrKey];
  const itemTitle = items?.[index]?.[title] || "";

  const { setNodeRef, setActivatorNodeRef, listeners, attributes: dragAttributes, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: "relative",
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="bPlSortablePanelItem">
      <div className="itemsPanelHeader mt10">
        <div className="gripIcon" ref={setActivatorNodeRef} {...dragAttributes} {...listeners}>{gripIcon}</div>

        <div className="panel-header-title">
          <div
            className="repeater-panel-title"
            onClick={() => {
              setActive(active === index ? null : index);
              setActiveIndex && setActiveIndex(index);
            }}
          >
            {title ? itemTitle : itemLabel + " " + (index + 1)}
          </div>

          <div className="itemAction">
            <div onClick={(e) => duplicateItem(e, index)}>{copyIcon}</div>

            {items.length > 1 && (
              <div onClick={(e) => removeItem(e, index)}>{closeIcon}</div>
            )}
          </div>
        </div>
      </div>

      <div className={`itemsPanelBody ${active === index ? "" : "hidden"}`}>
        <ItemSettings {...props} index={index} />
      </div>
    </div>
  );
};

const Sortable = (props) => {
  const { attributes, setAttributes, arrKey, activeIndex } = props;
  const items = attributes[arrKey];

  const [active, setActive] = useState(activeIndex || 0);
  useEffect(() => {
    setActive(activeIndex || 0);
  }, [activeIndex]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const onDragEnd = ({ active: dragged, over }) => {
    if (!over || dragged.id === over.id) {
      return;
    }
    // Item ids are index + 1: dnd-kit treats an id of 0 as no item.
    setAttributes({ [arrKey]: arrayMove(items, dragged.id - 1, over.id - 1) });
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext items={items.map((_, index) => index + 1)} strategy={verticalListSortingStrategy}>
        <div className="bPlItemsPanel">
          {items.map((__, index) => (
            <SortableItem key={index} id={index + 1} index={index} active={active} setActive={setActive} {...props} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Sortable;
