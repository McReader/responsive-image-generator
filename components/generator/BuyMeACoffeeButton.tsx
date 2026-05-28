import Image from "next/image";

export function BuyMeACoffeeButton() {
  return (
    <a
      href="https://www.buymeacoffee.com/mcreader"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0"
    >
      <Image
        src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=mcreader&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
        alt="Buy me a coffee"
        style={{ height: "48px", width: "auto" }}
        width={144}
        height={48}
      />
    </a>
  );
}
