import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NoticeList } from "@/components/NoticeList";
import type { Notice } from "@/lib/notices";

const notices: Notice[] = [
  {
    id: "beta",
    title: "Beta notice",
    published: "2026-10-15",
    summary: "Water rate for the quarter stays at the published figure.",
    source_url: "fixtures/records/beta.html",
  },
];

test("the open notice is marked and a click selects another", async () => {
  const onOpen = jest.fn();
  render(<NoticeList notices={notices} activeId="beta" query="" onOpen={onOpen} onClear={jest.fn()} />);

  const button = screen.getByRole("button", { name: /beta notice/i });
  expect(button).toHaveAttribute("aria-current", "true");
  await userEvent.click(button);
  expect(onOpen).toHaveBeenCalledWith("beta");
});

test("an empty search result offers a way back", async () => {
  const onClear = jest.fn();
  render(<NoticeList notices={[]} activeId={undefined} query="clinic" onOpen={jest.fn()} onClear={onClear} />);
  await userEvent.click(screen.getByRole("button", { name: /clear the search/i }));
  expect(onClear).toHaveBeenCalled();
});
